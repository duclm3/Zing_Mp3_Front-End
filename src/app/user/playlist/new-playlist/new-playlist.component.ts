import { Component, OnInit } from '@angular/core';
import {Playlist} from '../../../model/playlist';
import {PlaylistService} from '../../../service/playlist.service';

declare var $: any;

@Component({
  selector: 'app-new-playlist',
  templateUrl: './new-playlist.component.html',
  styleUrls: ['./new-playlist.component.css']
})
export class NewPlaylistComponent implements OnInit {
  newPlaylists: Playlist[] = [];
  constructor(private playlistService: PlaylistService) {
    this.getNewPlaylist();
    console.log(this.newPlaylists);
  }

  ngOnInit() {
    this.getNewPlaylist();

    $(function() {
      $('.treanding_song_slider .owl-carousel').owlCarousel({
        loop: !0,
        margin: 15,
        autoplay: !1,
        smartSpeed: 1200,
        responsiveClass: !0,
        navText: ['<i class="flaticon-left-arrow"></i>', '<i class="flaticon-right-arrow"></i>'],
        responsive: {
          0: {
            items: 1,
            nav: !0
          },
          600: {
            items: 3,
            nav: !0
          },
          1000: {
            items: 5,
            nav: !0,
            loop: !0,
            margin: 20
          }
        }
      });
    });
  }

  getNewPlaylist() {
    this.playlistService.getTop10PlaylistNew().subscribe(playlists => {
      this.newPlaylists = playlists;
    });
  }
}
