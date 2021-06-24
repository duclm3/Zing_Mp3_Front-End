import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../service/authentication.service";
import {Artist} from "../../../model/artist";
import {Genre} from "../../../model/genre";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SongService} from "../../../service/song.service";
import {ArtistService} from "../../../service/artist.service";
import {GenreService} from "../../../service/genre.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import * as $ from "jquery";
import Swal from "sweetalert2";

@Component({
  selector: 'app-song-edit',
  templateUrl: './song-edit.component.html',
  styleUrls: ['./song-edit.component.css']
})
export class SongEditComponent implements OnInit {
  success: boolean;
  submitted = false;
  avatar = '';
  files = '';
  artists: Artist[] = []
  genres: Genre[] = []
  editForm: FormGroup = new FormGroup({
    nameSong: new FormControl(''),
    description: new FormControl(''),
    author: new FormControl(''),
    artist: new FormControl(''),
    genre: new FormControl(''),
    imageUrl: new FormControl(''),
    songUrl: new FormControl(''),
    album: new FormControl(''),
  });
  id?: number;

  constructor(private auth: AuthenticationService, private songService: SongService,
              private artistService: ArtistService, private genreService: GenreService,
              private fb: FormBuilder,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.getSong(this.id);
    });
  }


  onChangeAvatar($event) {
    this.avatar = $event;
    console.log('avatar ===>', this.avatar);


  }

  onChangeFile($event) {
    this.files = $event;
    console.log('files ===>', this.files);
  }

  ngOnInit() {
    this.getAllArtist();
    this.getAllGenre();
  };

  getSong(id: number) {
    return this.songService.findById(id).subscribe(song => {
      this.editForm = new FormGroup({
        nameSong: new FormControl(song.nameSong, [Validators.required]),
        description: new FormControl(song.description, [Validators.required]),
        author: new FormControl(song.author, [Validators.required]),
        artist: new FormControl(song.artist.id, [Validators.required]),
        genre: new FormControl(song.genre.id, [Validators.required]),
        imageUrl: new FormControl(song.imageUrl),
        songUrl: new FormControl(song.songUrl),
        album: new FormControl(song.album, [Validators.required]),
      });
    });
  }

  editSong(id: number) {
    this.submitted = true;
    if (this.editForm.valid ) {
      const song = this.editForm.value;
      song.imageUrl = this.avatar;
      song.songUrl = this.files;
      song.artist = {
        id: song.artist
      }
      song.genre = {
        id: song.genre
      }
      this.songService.updateSong(this.id, song).subscribe(() => {
        console.log(this.editForm)
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
            title: 'update Song successfully',
          });
        });
      }, e => {
        console.log(e);
      });
    }
    this.success = false;
  }

  getAllArtist() {
    this.artistService.getAll().subscribe(artists => {
      this.artists = artists;
    })
  }

  getAllGenre() {
    this.genreService.getAll().subscribe(genres => {
      this.genres = genres;
    })
  }
}
