
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Song} from '../../../model/song';
import {SongService} from '../../../service/song.service';
import {Router} from '@angular/router';
import {ListenMusicService} from '../../listen-music.service';
import {Subscription} from 'rxjs';
import {UserService} from '../../../service/user/user.service';
import * as $ from 'jquery';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-song-user',
  templateUrl: './song-user.component.html',
  styleUrls: ['./song-user.component.css']
})
export class SongUserComponent implements OnInit {

  songs: Song[] = [];
  song: Song;
  id: number;

  subscription: Subscription;

  constructor(private songService: SongService, private router: Router,
              private listenMusicService: ListenMusicService, private userService: UserService) {
    this.songService.getYourSong().subscribe(songs => {
      this.songs = songs;
      console.log(this.songs);
    }, error => {
      console.log('error', error);
    });
  }

  ngOnInit() {
    this.getYourSong();
  }

  getYourSong() {
    this.songService.getYourSong().subscribe(songs => {
      this.songs = songs;
    }, error => {
      console.log('error', error);
    });
  }

  deleteSong(id: number) {
      Swal.fire({
        title: 'Are you sure want to remove?',
        text: 'You will not be able to recover this song!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
      }).then((result) => {
        if (result.value) {
          this.songService.deleteSong(id).subscribe(song => {
            this.song = song;
            this.getYourSong();
          }, error => {
            console.log('error', error);
          });
          Swal.fire(
            'Deleted!',
            'Your song has been deleted.',
            'success'
          )
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'Your song file is safe :)',
            'error'
          )
        }
      })

    // console.log('abb',statusDelete);
    // if(statusDelete){
    //   this.songService.deleteSong(id).subscribe(song => {
    //     this.song = song;
    //     this.getYourSong();
    //   }, error => {
    //     console.log('error', error);
    //   });
    // }
  }


  getInforSong(song) {
    this.listenMusicService.statusSong.next(true);
    this.listenMusicService.songs = this.songs;
    this.listenMusicService.songObject.next(song);
    this.listenMusicService.openFile(song);
  }


}
