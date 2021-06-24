import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Artist} from '../model/artist';
import {Genre} from '../model/genre';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';


const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Genre[]> {
    return this.http.get<Genre[]>(API_URL + '/genres');
  }

}
