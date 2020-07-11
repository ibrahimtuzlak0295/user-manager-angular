import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  isLoggedIn: any;
  private isLoggedInSubscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedInSubscription = this.authService.isLoggedIn().subscribe(data => {
      this.isLoggedIn = data;
    });
  }

  ngOnDestroy(): void {
    if(this.isLoggedInSubscription) {
      this.isLoggedInSubscription.unsubscribe();
    }
  }

}
