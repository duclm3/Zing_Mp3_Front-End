import { Component, OnInit } from '@angular/core';
import {Playlist} from '../../../model/playlist';
import {PlaylistService} from '../../../service/playlist.service';
declare var $: any;

@Component({
  selector: 'app-top-playlist',
  templateUrl: './top-playlist.component.html',
  styleUrls: ['./top-playlist.component.css']
})
export class TopPlaylistComponent implements OnInit {

  topPlaylists: Playlist[] = [];
  constructor(private playlistService: PlaylistService) { }

  ngOnInit() {
    this.getTopView();
    $(function(){
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
  getTopView() {
    this.playlistService.getTop10PlayListSong().subscribe(views => {
      this.topPlaylists = views;
    });
  }
}
