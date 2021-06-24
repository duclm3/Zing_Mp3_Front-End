import {Component, OnInit} from '@angular/core';
import {Song} from '../../../model/song';
import {Playlist} from '../../../model/playlist';
import {Artist} from '../../../model/artist';
import {ArtistService} from '../../../service/artist.service';
import {ActivatedRoute, ParamMap, Route} from '@angular/router';
import {SongService} from '../../../service/song.service';
import {ListenMusicService} from '../../listen-music.service';

@Component({
  selector: 'app-detail-artist',
  templateUrl: './detail-artist.component.html',
  styleUrls: ['./detail-artist.component.css']
})
export class DetailArtistComponent implements OnInit {
  id?: number;
  songs: Song[] = [{songUrl: null}, {songUrl: null}, {songUrl: null}];
  song: Song;
  artist?: Artist;
  page = 1;
  pageSize = 10;
  constructor(private artistService: ArtistService, private activatedRoute: ActivatedRoute,
              private songService: SongService, private listenMusicService: ListenMusicService) {
    this.activatedRoute.paramMap.subscribe(async (paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      // @ts-ignore
      this.artist = await this.getArtist(this.id);
    });

  }

  ngOnInit() {
    this.getAllSongByArtist(this.id);
    this.getInforSong(this.song)
  }

  getArtist(id: number) {
    this.artistService.findById(id).subscribe(artist => {
      this.artist = artist;
    });
  }

  getAllSongByArtist(id: number) {
    this.songService.findAllSongByArtist(id).subscribe(songs => {
      this.songs = songs;
    });
  }
  getInforSong(song) {
    this.listenMusicService.statusSong.next(true);
    this.listenMusicService.songs = this.songs;
    this.listenMusicService.songObject.next(song);
    this.listenMusicService.openFile(song);
  }
}
