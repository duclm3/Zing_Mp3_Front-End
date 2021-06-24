import {Component, OnInit, DoCheck, OnDestroy, ViewChild, ElementRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ListenMusicService} from '../../listen-music.service';
import {Song} from '../../../model/song';
import {Subscription} from 'rxjs';
import {UserService} from '../../../service/user/user.service';


@Component({
  selector: 'app-song-play',
  templateUrl: './song-play.component.html',
  styleUrls: ['./song-play.component.css']
})
export class SongPlayComponent implements OnInit {
  inforSong: any;
  song: Song = {songUrl: null};
  status = false;
  subscription: Subscription;
  listPlaylist: Song[];
  indexSong = 0;
  statusRepeat = false;
  statusMix = false;
  colorRepeat :'orange';
  // @ts-ignore
  @ViewChild('repeatElement') repeatElement: ElementRef;
  // @ts-ignore
  @ViewChild('mixElement') mixElement: ElementRef;

  constructor(private route: ActivatedRoute, private listenMusicService: ListenMusicService, private userService: UserService) {
    this.listenMusicService.getState().subscribe(state => {
      this.listenMusicService.songObject.asObservable().subscribe(song => {
        this.song = song;
      });
      this.listPlaylist = this.listenMusicService.songs;
      let randomElement = Math.floor(Math.random() * this.listPlaylist.length - 1);
      this.listPlaylist.filter((song, index: number) => {
        if (song.id === this.song.id) {
          this.indexSong = index;
        }
      });
      const isBaiHatCuoiCungTrongPlaylist = (this.indexSong === (this.listPlaylist.length - 1));
      if(state.state === 'pause' && state.currentTime >= state.duration) {
        if(this.statusRepeat){
          this.listenMusicService.songObject.next(this.listPlaylist[this.indexSong]);
          this.listenMusicService.openFile(this.listPlaylist[this.indexSong]);
          return;
        }
        if(this.statusMix){
          this.listenMusicService.songObject.next(this.listPlaylist[randomElement]);
          this.listenMusicService.openFile(this.listPlaylist[randomElement]);
          return;
        }
        if(isBaiHatCuoiCungTrongPlaylist){
          this.listenMusicService.songObject.next(this.listPlaylist[0]);
          this.listenMusicService.openFile(this.listPlaylist[0]);
          return;
        }
        this.indexSong += 1;

        console.log('Next bai hat');
        this.listenMusicService.songObject.next(this.listPlaylist[this.indexSong]);
        this.listenMusicService.openFile(this.listPlaylist[this.indexSong]);
      } else {
        console.log('khong next bai hat');
      }
    });
  }

  play() {
    this.status ? this.listenMusicService.play() : this.listenMusicService.pause();
    this.status = !this.status;
  }

  ngOnInit() {

  }

  setVolume(event: Event) {
    this.listenMusicService.setVolume(event);
  }

  nextSong(indexSong) {
    if(this.listPlaylist.length > 0 && this.listPlaylist.length - 1 > indexSong){
        this.indexSong += 1;
        this.listenMusicService.songObject.next(this.listPlaylist[this.indexSong]);
        this.listenMusicService.openFile(this.listPlaylist[this.indexSong]);
    }
  }

  previousSong(indexSong: number) {
    if(this.listPlaylist.length > 0 && indexSong > 0){
      if(this.listPlaylist[0] != indexSong){
        this.indexSong -= 1;
        this.listenMusicService.songObject.next(this.listPlaylist[this.indexSong]);
        this.listenMusicService.openFile(this.listPlaylist[this.indexSong]);
        console.log(this.indexSong);
      }
    }
  }

  repeatSong() {
    this.statusRepeat = !this.statusRepeat;
    if(this.statusRepeat){
      this.repeatElement.nativeElement.style.color = '#ff5e3a';
    }else{
      this.repeatElement.nativeElement.style.color = '#888888';
    }
    console.log(this.statusRepeat);
  }
  mixSong(){
    this.statusMix = !this.statusMix;
    if(this.statusMix){
      this.mixElement.nativeElement.style.color = '#ff5e3a';
    }else{
      this.mixElement.nativeElement.style.color = '#888888';
    }
    console.log(this.statusMix);
  }
}
