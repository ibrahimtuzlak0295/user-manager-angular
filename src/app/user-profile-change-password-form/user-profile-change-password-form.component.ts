import { Component, OnInit, Input } from '@angular/core';
import { UsersApiService } from '../users-api.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { User } from '../user';
import { ConfirmedValidator } from '../confirmed.validator';

@Component({
  selector: 'app-user-profile-change-password-form',
  templateUrl: './user-profile-change-password-form.component.html',
  styleUrls: ['./user-profile-change-password-form.component.scss']
})
export class UserProfileChangePasswordFormComponent implements OnInit {

  userProfileEditorForm;

  password_old: AbstractControl;
  password_new: AbstractControl;
  password_new_confirmation: AbstractControl;
  @Input('user') user: User;


  constructor(private usersApiService: UsersApiService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.userProfileEditorForm = this.formBuilder.group({
      password_old: ['', [Validators.required]],
      password_new: ['', [Validators.required, Validators.minLength(3)]],
      password_new_confirmation: ['', [Validators.required, Validators.minLength(3)]]
    }, {validator: ConfirmedValidator('password_new', 'password_new_confirmation')}
    );

    this.password_old = this.userProfileEditorForm.get('password_old');
    this.password_new = this.userProfileEditorForm.get('password_new');
    this.password_new_confirmation = this.userProfileEditorForm.get('password_new_confirmation');
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
