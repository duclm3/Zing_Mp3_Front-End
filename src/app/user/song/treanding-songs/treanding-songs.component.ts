import { Component, OnInit } from '@angular/core';
import {Song} from '../../../model/song';
import {SongService} from '../../../service/song.service';
declare var $: any;

@Component({
  selector: 'app-treanding-songs',
  templateUrl: './treanding-songs.component.html',
  styleUrls: ['./treanding-songs.component.css']
})
export class TreandingSongsComponent implements OnInit {

  songs: Song[] = [];

  constructor(private songService: SongService) {

  }

  ngOnInit() {
    this.songService.getNewSong().subscribe(songs => {
      this.songs = songs;
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

    }, error => {console.log('error', error); });
  }

}
