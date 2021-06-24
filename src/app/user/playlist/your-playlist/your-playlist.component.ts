import {Component, OnInit} from '@angular/core';
import {Playlist} from '../../../model/playlist';
import {PlaylistService} from '../../../service/playlist.service';

@Component({
  selector: 'app-your-playlist',
  templateUrl: './your-playlist.component.html',
  styleUrls: ['./your-playlist.component.css']
})
export class YourPlaylistComponent implements OnInit {
  myPlaylist: Playlist[] = [];
  playlist: Playlist;

  constructor(
    private playlistService: PlaylistService
  ) {
  }

  ngOnInit() {
    this.getMyPlayList();
  }

  getMyPlayList() {
    this.playlistService.showMyPlaylist().subscribe(playLists => {
      this.myPlaylist = playLists;
    });
  }

  deletePlaylist(id: number) {
    this.playlistService.deletePlaylist(id).subscribe(playlist => {
      this.playlist = playlist;
      this.getMyPlayList()
    }, error => {
      console.log("error", error)
    })
  }
}
