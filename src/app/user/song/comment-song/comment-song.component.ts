import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CommentSong} from '../../../model/comment-song';
import {Song} from '../../../model/song';
import {LikeSong} from '../../../model/like-song';
import {SongService} from '../../../service/song.service';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {SongCommentService} from '../../../service/song-comment.service';
import {AuthenticationService} from '../../../service/authentication.service';
import {JwtResponse} from '../../../interface/jwt-response';
import {User} from '../../../model/user';
import {ListenMusicService} from '../../listen-music.service';
import {Playlist} from '../../../model/playlist';

@Component({
  selector: 'app-comment-song',
  templateUrl: './comment-song.component.html',
  styleUrls: ['./comment-song.component.css']
})
export class CommentSongComponent implements OnInit {
  success: boolean;
  submitted = false;
  commentSongs: CommentSong[] = [];
  currentUser: JwtResponse;
  user: User;
  hasRoleUser = false;
  song: Song = {
    likes:null,
    artist:{nameArtist:null}
  };
  songs: Song[] = [];

  commentSongForm: FormGroup;
  likeSong: LikeSong = {
  };
  id?: number;
  statusLike : boolean;
  // @ts-ignore
  @ViewChild('likeElement') likeElement : ElementRef;
  constructor(private songService: SongService,
              private songCommentService: SongCommentService,
              private httClient: HttpClient,
              private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private listenMusicService:ListenMusicService) {
    this.authenticationService.currentUserSubject.asObservable().subscribe(user => {
      this.currentUser = user;
    });
    if (this.currentUser) {
      const roleList = this.currentUser.roles;
      for (const role of roleList) {
        if (role.authority === 'ROLE_USER') {
          this.hasRoleUser = true;
        }
      }
    }

    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.getAllComment(this.id);
      this.getSong(this.id);
    });
    this.songCommentService.getStatus(this.id).subscribe(data =>{
      this.statusLike = data;
      if(this.statusLike){
        this.likeElement.nativeElement.style.color = 'red';
      }else{
        this.likeElement.nativeElement.style.color = 'black';
      }
    })

  }

  ngOnInit() {
    this.commentSongForm = this.fb.group({
      content: ['', [Validators.required, Validators.max(200)]],
    });
  }

  getAllComment(id: number) {
    this.songCommentService.allCommentInSong(id).subscribe(comment => {
      this.commentSongs = comment;
    });
  }

  getSong(id: number) {
    this.songService.findById(id).subscribe(songs => {
      this.song = songs;
      this.songs.push(songs);
    });
  }

  getPostComment(id: number) {
    this.submitted = true;
    if (this.commentSongForm.valid) {
      const comment = this.commentSongForm.value;
      this.songCommentService.postComment(comment, id).subscribe(() => {
        this.success = true;
        this.submitted = false;
        this.commentSongForm.reset();
        this.getAllComment(id);
      })
    }
  }
  handleLikeSong(id: number) {
    if( this.statusLike){
      this.statusLike = false;
      this.likeElement.nativeElement.style.color = 'black';
    }else{
      this.statusLike = true;
      this.likeElement.nativeElement.style.color = 'red';
    }
    this.songCommentService.likePlaylist(id).subscribe(newLikePL =>{
      this.getSong(id);
    })
  }

  getInforSong(song) {
    console.log('song',song);
    console.log('listsong',this.songs);
    this.listenMusicService.statusSong.next(true);
    this.listenMusicService.songs = this.songs;
    this.listenMusicService.songObject.next(song);
    this.listenMusicService.openFile(song);
  }
}
