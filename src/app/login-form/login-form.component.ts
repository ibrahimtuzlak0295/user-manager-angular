import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../user';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  user: User;

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(3)])
  })

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.user = this.activatedRoute.snapshot.data.user;
  }

  onSubmit(): void {
    this.authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(data => {
        localStorage.setItem('user_session', data.token);
      }, error => {
        alert(error.statusText);
        this.authService.setLoggedIn(false);
      }, () => {
        this.authService.setLoggedIn(true);
        this.router.navigateByUrl('/users/me');
      });
  }

}
