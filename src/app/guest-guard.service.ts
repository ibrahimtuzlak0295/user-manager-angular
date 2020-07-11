import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuestGuardService implements CanActivate {

  private isLoggedIn: any;

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.authService.isLoggedIn().subscribe(value => {
      this.isLoggedIn = value;
    })
    if(this.isLoggedIn) {
      this.router.navigate(['/']);
      return false;
    }
    return true
  }
}
