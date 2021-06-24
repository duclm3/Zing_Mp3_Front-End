import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {CommentArist} from '../../../model/comment-arist';
import {Artist} from '../../../model/artist';
import {ArtistService} from '../../../service/artist.service';
import {LikeArist} from '../../../model/like-arist';
import {CommentArtistService} from '../../../service/comment-artist.service';
import {AuthenticationService} from '../../../service/authentication.service';
import {JwtResponse} from '../../../interface/jwt-response';

@Component({
  selector: 'app-comment-artist',
  templateUrl: './comment-artist.component.html',
  styleUrls: ['./comment-artist.component.css']
})
export class CommentArtistComponent implements OnInit {

  success: boolean;
  submitted = false;
  currentUser: JwtResponse;
  hasRoleUser =  false;
  commentArists: CommentArist[] = [];
  artist: Artist = {
    likes:null,
  };
  commentAristForm: FormGroup;
  likeArtis: LikeArist = {
  };
  id?: number;
  statusLike = false ;
  // @ts-ignore
  @ViewChild('likeElement') likeElement : ElementRef;
  constructor(private artistService: ArtistService,
              private commentArtistService: CommentArtistService,
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
      this.getArtist(this.id);
    });
    this.commentArtistService.statusLike(this.id).subscribe(data =>{
        this.statusLike = data;
        if(this.statusLike){
          this.likeElement.nativeElement.style.color = 'red';
        }else{
          this.likeElement.nativeElement.style.color = 'black';
        }
    })

  }

  ngOnInit() {
    this.commentAristForm = this.fb.group({
      content: ['', [Validators.required, Validators.max(200)]],
    });
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.getAllComment(this.id);
      this.getArtist(this.id);
    });
  }

  getAllComment(id: number) {
    this.commentArtistService.allCommentInArtist(id).subscribe(comment => {
      this.commentArists = comment;
    });
  }

  getArtist(id: number) {
    this.artistService.findById(id).subscribe(artists => {
      this.artist = artists;
    });
  }

  getPostComment(id: number) {
    this.submitted = true;
    if (this.commentAristForm.valid) {
      const comment = this.commentAristForm.value;
      this.commentArtistService.postComment(comment, id).subscribe(() => {
        this.success = true;
        this.submitted = false;
        this.commentAristForm.reset();
        this.getAllComment(id);
      })
    }
  }
  handleLikeAritst(id: number) {
    if( this.statusLike){
      this.statusLike = false;
      this.likeElement.nativeElement.style.color = 'black';
    }else{
      this.statusLike = true;
      this.likeElement.nativeElement.style.color = 'red';
    }
    this.commentArtistService.likeArtist(id).subscribe(newLikePL =>{
      this.getArtist(id)
    })
  }
}
