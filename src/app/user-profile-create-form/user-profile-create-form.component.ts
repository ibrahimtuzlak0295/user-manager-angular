import { Component, OnInit } from '@angular/core';
import { UsersApiService } from '../users-api.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ConfirmedValidator } from '../confirmed.validator';

@Component({
  selector: 'app-user-profile-create-form',
  templateUrl: './user-profile-create-form.component.html',
  styleUrls: ['./user-profile-create-form.component.scss']
})
export class UserProfileCreateFormComponent implements OnInit {

  username: AbstractControl;
  password: AbstractControl;
  password_confirmation: AbstractControl;
  userProfileEditorForm;

  constructor(private usersApiService: UsersApiService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.userProfileEditorForm = this.formBuilder.group({
      username: ['', Validators.required],
      first_name: [''],
      last_name: [''],
      address: [''],
      zip: [''],
      city: [''],
      password: ['', [Validators.required, Validators.minLength(3)]],
      password_confirmation: ['', [Validators.required, Validators.minLength(3)]],
    }, { validator: ConfirmedValidator('password', 'password_confirmation')}
    );

    this.username = this.userProfileEditorForm.get('username');
    this.password = this.userProfileEditorForm.get('password');
    this.password_confirmation = this.userProfileEditorForm.get('password_confirmation');

  }

  onSubmit() {
    this.usersApiService.create(this.userProfileEditorForm.value).subscribe(data => {
      console.log(data);
    }, error => {
      alert(error.statusText);
    }, () => {
      alert("Success");
      this.router.navigateByUrl('/login');
    });
  }

}
