import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  isLoggedIn: boolean;
  isLoggedInSubscription: Subscription;

  title = 'User Manager';

  constructor(private authService: AuthService, private router: Router, private location: Location) {}

  ngOnInit(): void {
    this.isLoggedInSubscription = this.authService.isLoggedIn().subscribe((data) => {
      this.isLoggedIn = data;
    });
  }

  ngOnDestroy(): void {
    if(this.isLoggedInSubscription) {
      this.isLoggedInSubscription.unsubscribe();
    }
  }

  onLogout() {
    this.authService.logout().subscribe(() => {
      localStorage.removeItem('user_session');
      this.authService.setLoggedIn(false);
      this.router.navigateByUrl('/login');
    })
  }

  back() {
    this.location.back();
  }

}
