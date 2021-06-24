import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PlaylistService} from '../../../service/playlist.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Playlist} from '../../../model/playlist';
import {Commentplaylist} from '../../../model/commentplaylist';
import {Likeplaylist} from '../../../model/likeplaylist';
import {PlaylistCommentService} from '../../../service/playlist-comment.service';
import {User} from '../../../model/user';
import {AuthenticationService} from '../../../service/authentication.service';
import {JwtResponse} from '../../../interface/jwt-response';

@Component({
  selector: 'app-comment-playlist',
  templateUrl: './comment-playlist.component.html',
  styleUrls: ['./comment-playlist.component.css']
})
export class CommentPlaylistComponent implements OnInit {
  success: boolean;
  submitted = false;
  user: User;
  currentUser: JwtResponse;
  hasRoleUser = false;
  commentplaylists: Commentplaylist[] = [];
  playlistSong: Playlist = {
    likes:null,
    songs:null
  };
  commentForm: FormGroup;
  likePlaylist: Likeplaylist = {
    // isLike:null,
  };
  id?: number;
  statusLike : boolean;
  // @ts-ignore
  @ViewChild('likeElement') likeElement : ElementRef;
  constructor(private playlistComment: PlaylistCommentService,
              private playlistService: PlaylistService,
              private httClient: HttpClient,
              private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private authenticationService: AuthenticationService) {
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
      this.getPlaylist(this.id);
    });
    this.playlistComment.getStatus(this.id).subscribe(data =>{
      this.statusLike = data;
      if(this.statusLike){
        this.likeElement.nativeElement.style.color = 'red';
      }else{
        this.likeElement.nativeElement.style.color = 'black';
      }
    })

  }

  ngOnInit() {
    this.commentForm = this.fb.group({
      content: ['', [Validators.required, Validators.max(200)]],
    });

  }

  getAllComment(id: number) {
    this.playlistComment.allCommentInPlaylist(id).subscribe(comment => {
      this.commentplaylists = comment;
    });
  }

  getPlaylist(id: number) {
    this.playlistService.findById(id).subscribe(playlist => {
      this.playlistSong = playlist;
    });
  }

  getPostComment(id: number) {
    this.submitted = true;
    if (this.commentForm.valid) {
      const comment = this.commentForm.value;
      this.playlistComment.postComment(comment, id).subscribe(() => {
        this.success = true;
        this.submitted = false;
        this.commentForm.reset();
        this.getAllComment(id);
      })
    }
  }
  handleLike(id: number) {
    if( this.statusLike){
      this.statusLike = false;
      this.likeElement.nativeElement.style.color = 'black';
    }else{
      this.statusLike = true;
      this.likeElement.nativeElement.style.color = 'red';
    }
    this.playlistComment.likePlaylist(id).subscribe(newLikePL =>{
      this.getPlaylist(id);
    })
  }
}
