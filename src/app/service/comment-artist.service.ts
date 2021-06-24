import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CommentArist} from '../model/comment-arist';
import {LikeArist} from '../model/like-arist';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class CommentArtistService {

  constructor(private http: HttpClient) { }

  allCommentInArtist(id: number): Observable<any> {
    return this.http.get<CommentArist[]>(`${API_URL}/comments/artists/show/${id}`);
  }

  postComment(comment: CommentArist, id: number): Observable<CommentArist> {
    return this.http.post<CommentArist>(`${API_URL}/comments/artists/${id}`, comment);
  }

  likeArtist(id: number): Observable<LikeArist> {
    return this.http.post<LikeArist>(`${API_URL}/likes/artists/${id}`, id);
  }

  statusLike(id: number): Observable<boolean> {
    return this.http.get<boolean>(`${API_URL}/likes/artists/${id}`);
  }


}
