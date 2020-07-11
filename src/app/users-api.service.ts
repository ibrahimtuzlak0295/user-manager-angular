import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';
import { newPasswordFields } from './newPasswordFields';

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {

  constructor(private http: HttpClient) { }

  private usersEndpoint = "http://localhost:8000/api/users"; // TODO: Move to config file?

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.usersEndpoint + '/login', {
      'username': username,
      'password': password
    });
  }

  getProfile(): Observable<any> {
    return this.http.get(this.usersEndpoint + '/me');
  }

  logout(): Observable<any> {
    return this.http.get(this.usersEndpoint + '/logout');
  }

  create(data: User): Observable<any> {
    return this.http.post(this.usersEndpoint + '/create', data);
  }

  update(data: User): Observable<any> {
    return this.http.put(this.usersEndpoint + '/update', data);
  }

  updatePassword(newPasswordFields: newPasswordFields) {
    return this.http.put(this.usersEndpoint + '/updatePassword', newPasswordFields);
  }
}
