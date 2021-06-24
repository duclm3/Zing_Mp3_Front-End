import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Artist} from '../model/artist';

const API_URL = `${environment.apiUrl}`;


@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Artist[]> {
    return this.http.get<Artist[]>(API_URL + '/artists');
  }

  getTopArtis(): Observable<Artist[]> {
    return this.http.get<Artist[]>(API_URL + '/artists/top');
  }

  saveArtist(artist: Artist): Observable<Artist> {
    return this.http.post<Artist>(API_URL + '/artists', artist);
  }


  findById(id: number): Observable<Artist> {
    return this.http.get<Artist>(`${API_URL}/artists/${id}`);
  }

  updateArtis(id: number, artist: Artist): Observable<Artist> {
    return this.http.put<Artist>(`${API_URL}/artists/${id}`, artist);
  }

  deleteArtis(id: number): Observable<Artist> {
    return this.http.get<Artist>(`${API_URL}/artists/delete/${id}`);
  }

  searchArtist(name: string): Observable<Artist[]> {
    return this.http.get<Artist[]>(`${API_URL}/artists/search/${name}`);
  }


}
