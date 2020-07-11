import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { UsersApiService } from './users-api.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userLoggedIn = new BehaviorSubject(false);

  constructor(private usersApi: UsersApiService, private jwtHelper: JwtHelperService) { }

  isLoggedIn(): Observable<boolean> {
    if(this.jwtHelper.isTokenExpired()) {
      this.setLoggedIn(false);
      this.invalidateToken();
      return this.getLoggedIn();
    }

    if(!localStorage.getItem("user_session")) {
      this.setLoggedIn(false);
      return this.getLoggedIn();
    }

    this.setLoggedIn(true);
    return this.getLoggedIn();

  }

  getLoggedIn(): Observable<boolean> {
    return this.userLoggedIn.asObservable();
  }

  getLoggedInValue(): boolean {
    return this.userLoggedIn.getValue();
  }

  setLoggedIn(value: boolean) {
    this.userLoggedIn.next(value);
  }

  login(username: string, password: string): Observable<any> {
    return this.usersApi.login(username, password);
  }

  logout(): Observable<any> {
    return this.usersApi.logout();
  }

  invalidateToken() {
    localStorage.removeItem("user_session");
  }
}
