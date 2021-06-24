import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../model/user';
import {any} from 'codelyzer/util/function';

const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) {}

  register(user: User): Observable<any> {
    return this.http.post<any>(API_URL + '/register', user);
  }

  saveUser(user: User): Observable<User> {
    // const obj = JSON.parse(localStorage.getItem('currentUser'));
    // obj.avatar = user.avatar;
    // localStorage.setItem('currentUser', JSON.stringify(obj));
    return this.http.put<User>(API_URL + '/users', user);
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(API_URL + '/users');
  }
}
