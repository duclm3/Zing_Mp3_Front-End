import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Playlist} from '../model/playlist';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(API_URL + `/playlists/list`);
  }

  createNewPlaylist(playlist: Playlist): Observable<Playlist> {
    return this.http.post<Playlist>(API_URL + `/playlists/create`, playlist);
  }

  getTop10PlaylistNew(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(API_URL + `/playlists/news`);
  }

  getTop10PlayListSong(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(`${API_URL}/playlists/topview`);
  }

  myPlaylists(): Observable<any> {
    return this.http.get<Playlist[]>(`${API_URL}/playlists/myplaylists`);
  }

  editPlaylists(id: number, playlist: Playlist): Observable<Playlist> {
    return this.http.put<Playlist>(`${API_URL}/playlists/${id}`, playlist);
  }

  findById(id: number): Observable<Playlist> {
    return this.http.get<Playlist>(`${API_URL}/playlists/detail/${id}`);
  }

  showMyPlaylist(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(`${API_URL}/playlists/myPlaylist`);
  }

  addSongToPlaylist(idPlaylist:number, idSong:number): Observable<Playlist> {
    return this.http.get<Playlist>(`${API_URL}/playlists/user/${idPlaylist}/songs/${idSong}`);
  }
  deletePlaylist(id: number): Observable<Playlist> {
    return this.http.get<Playlist>(`${API_URL}/playlists/${id}`);
  }
  remoteSongInPlaylist(idPlaylist: number,idSong:number){
    return this.http.get<Playlist>(`${API_URL}/playlists/${idPlaylist}/songs/${idSong}`);
  }

  searchPlaylist(name: string): Observable<any> {
    return this.http.get<any>(`${API_URL}/playlists/search/${name}`);
  }

}
