import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UsersApiService } from '../users-api.service';
import { Router } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'app-user-profile-edit-form',
  templateUrl: './user-profile-edit-form.component.html',
  styleUrls: ['./user-profile-edit-form.component.scss']
})
export class UserProfileEditFormComponent implements OnInit {

  @Input('user') user: User;
  userProfileEditorForm;

  constructor(private usersApiService: UsersApiService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.userProfileEditorForm = this.formBuilder.group({
      username: [this.user.username],
      first_name: [this.user.first_name],
      last_name: [this.user.last_name],
      address: [this.user.address],
      zip: [this.user.zip],
      city: [this.user.city]
    });
    // TODO: Validate

    this.userProfileEditorForm.get('username').disable();
  }

  onSubmit() {
    this.usersApiService.update(this.userProfileEditorForm.value).subscribe(data => {
      console.log(data);
    }, error => {
      alert(error.statusText);
    }, () => {
      alert("Success");
      this.router.navigateByUrl('/users/me');
    });

  }

}
