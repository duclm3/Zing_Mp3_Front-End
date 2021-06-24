import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Commentplaylist} from '../model/commentplaylist';
import {Observable} from 'rxjs';
import {Likeplaylist} from '../model/likeplaylist';
import {environment} from '../../environments/environment';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class PlaylistCommentService {

  constructor(private http: HttpClient) { }

  allCommentInPlaylist(id: number): Observable<any> {
    return this.http.get<Commentplaylist[]>(`${API_URL}/comments/playlists/show/${id}`);
  }

  postComment(comment: Commentplaylist, id: number): Observable<Commentplaylist> {
    return this.http.post<Commentplaylist>(`${API_URL}/comments/playlists/${id}`, comment);
  }

  likePlaylist(id: number): Observable<Likeplaylist> {
    return this.http.post<Likeplaylist>(`${API_URL}/likes/playlists/${id}`, id);
  }

  getStatus(id: number): Observable<boolean> {
    return this.http.get<boolean>(`${API_URL}/likes/playlists/${id}`);
  }

}
