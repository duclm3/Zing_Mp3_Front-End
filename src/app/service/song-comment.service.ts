import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CommentSong} from '../model/comment-song';
import {LikeSong} from '../model/like-song';

const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class SongCommentService {

  constructor(private http: HttpClient) { }

  allCommentInSong(id: number): Observable<any> {
    return this.http.get<CommentSong[]>(`${API_URL}/comments/songs/show/${id}`);
  }

  postComment(comment: CommentSong, id: number): Observable<CommentSong> {
    return this.http.post<CommentSong>(`${API_URL}/comments/songs/${id}`, comment);
  }

  likePlaylist(id: number): Observable<LikeSong> {
    return this.http.post<LikeSong>(`${API_URL}/likes/songs/${id}`, id);
  }

  getStatus(id: number): Observable<boolean> {
    return this.http.get<boolean>(`${API_URL}/likes/songs/${id}`);
  }

}
