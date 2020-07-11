import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { empty } from 'rxjs';
import { UsersApiService } from './users-api.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserProfileResolverService {

  constructor(private usersApi: UsersApiService, private authService: AuthService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.usersApi.getProfile().pipe(
      catchError((error) => {
        this.authService.invalidateToken();
        return empty();
      })
    );
  }


}
