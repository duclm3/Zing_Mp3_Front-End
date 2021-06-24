import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {PlaylistService} from '../../../service/playlist.service';
import {Genre} from '../../../model/genre';
import {GenreService} from '../../../service/genre.service';
import {AuthenticationService} from '../../../service/authentication.service';
import {ArtistService} from '../../../service/artist.service';
import Swal from 'sweetalert2';
import {Playlist} from '../../../model/playlist';
declare var $: any

@Component({
  selector: 'app-create-playlist',
  templateUrl: './create-playlist.component.html',
  styleUrls: ['./create-playlist.component.css']
})
export class CreatePlaylistComponent implements OnInit {
  success: boolean;
  submitted = false;
  avatar = '';
  genres: Genre[] = [];
  myPlaylist: Playlist[]=[];
  playlistForm: FormGroup;

  constructor(private auth: AuthenticationService, private playlistService: PlaylistService,
              private artistService: ArtistService, private genreService: GenreService,
              private fb: FormBuilder) {

  }
  onChangeAvatar($event) {
    this.avatar = $event;
    console.log('avatar ===>', this.avatar);
  }
  ngOnInit(): void {
    this.getAllGenre();
    this.getMyPlayList()
    this.playlistForm = this.fb.group({
      namePlaylist: ['', [Validators.required, Validators.max(30)]],
      description: ['', [Validators.required, Validators.max(50)]],
      genre: ['', [Validators.required]],
      image: ['']
    });

  }

  getMyPlayList() {
    this.playlistService.showMyPlaylist().subscribe(playLists => {
      this.myPlaylist = playLists;
    });
  }
  createPlaylist() {
    this.submitted = true;
    if (this.myPlaylist.length<=20) {
      if (this.playlistForm.valid) {
        const playlists = this.playlistForm.value;
        playlists.image = this.avatar;
        playlists.genre = {
          id: playlists.genre
        };
        this.playlistService.createNewPlaylist(playlists).subscribe(() => {
          this.success = true;
          this.submitted = false;
          $(function() {
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000
            });
            // @ts-ignore
            Toast.fire({
              icon: 'success',
              type: 'success',
              title: ' Successful playlist creation',
            });
          });
          this.playlistForm.reset();
        }, e => {
        });
      }
    }$(function() {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });
      // @ts-ignore
      Toast.fire( {
        icon: 'error',
        type: 'success',
        title: 'The number of Playlists is too limited',
      });
    });
  }
  getAllGenre() {
    this.genreService.getAll().subscribe(genres => {
      this.genres = genres;
    });
  }


  resetForm() {
    this.playlistForm.reset();
  }
}

