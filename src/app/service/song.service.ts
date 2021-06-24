import { Injectable } from '@angular/core';
import {Song} from '../model/song';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

const API_URL = `${environment.apiUrl}`;


@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any>(API_URL + '/songs');
  }


  getYourSong(): Observable<any> {
    return this.http.get<any>(API_URL + '/songs/yoursongs');
  }

  getTopSong(): Observable<any> {
    return this.http.get<any>(API_URL + '/songs/top');
  }

  getNewSong(): Observable<any> {
    return this.http.get<any>(API_URL + '/songs/new');
  }

  saveSong(song: Song): Observable<Song> {
    return this.http.post<Song>(API_URL + '/songs', song);
  }


  findById(id: number): Observable<Song> {
    return this.http.get<Song>(`http://localhost:8080/songs/detail/${id}`);
  }

  updateSong(id: number, song: Song): Observable<Song> {
    return this.http.put<Song>(`${API_URL}/songs/${id}`, song);
  }

  deleteSong(id: number): Observable<Song> {
    return this.http.get<Song>(`${API_URL}/songs/${id}`);
  }
  getAllSongByPlaylistId(id: number): Observable<any> {
    return this.http.get<any>(`${API_URL}/playlists/${id}/songs`);
  }
  findAllSongByArtist(idArtist: number): Observable<any>{
    return this.http.get<any>(`${API_URL}/songs/artists/${idArtist}`);

  }

  searchSong(name: string): Observable<any> {
    return this.http.get<any>(`${API_URL}/songs/search/${name}`);
  }
}
