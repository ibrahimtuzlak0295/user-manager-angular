import { Component, OnInit } from '@angular/core';
import { UsersApiService } from '../users-api.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-profile-create-form',
  templateUrl: './user-profile-create-form.component.html',
  styleUrls: ['./user-profile-create-form.component.scss']
})
export class UserProfileCreateFormComponent implements OnInit {

  userProfileEditorForm;

  constructor(private usersApiService: UsersApiService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.userProfileEditorForm = this.formBuilder.group({
      username: [''],
      first_name: [''],
      last_name: [''],
      address: [''],
      zip: [''],
      city: [''],
      password: [''],
      password_confirmation: [''],
      // TODO: Validators
    });
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
