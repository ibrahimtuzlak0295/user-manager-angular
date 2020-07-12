import { Component, OnInit, Input } from '@angular/core';
import { UsersApiService } from '../users-api.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '../user';

@Component({
  selector: 'app-user-profile-change-password-form',
  templateUrl: './user-profile-change-password-form.component.html',
  styleUrls: ['./user-profile-change-password-form.component.scss']
})
export class UserProfileChangePasswordFormComponent implements OnInit {

  userProfileEditorForm;
  @Input('user') user: User;


  constructor(private usersApiService: UsersApiService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.userProfileEditorForm = this.formBuilder.group({
      password_old: ['', Validators.required],
      password_new: ['', Validators.required],
      password_new_confirmation: ['', Validators.required]
    });
  }

  onSubmit() {
    this.usersApiService.updatePassword(this.userProfileEditorForm.value).subscribe(data => {
      console.log(data);
    }, error => {
      alert(error.statusText);
    }, () => {
      alert("Success");
      this.router.navigateByUrl('/login');
    });
  }

}
