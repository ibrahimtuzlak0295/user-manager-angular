import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginFormComponent } from './login-form/login-form.component';
import { JwtModule } from "@auth0/angular-jwt";
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserProfileEditFormComponent } from './user-profile-edit-form/user-profile-edit-form.component';
import { UserProfileEditComponent } from './user-profile-edit/user-profile-edit.component';
import { UserProfileCreateComponent } from './user-profile-create/user-profile-create.component';
import { UserProfileCreateFormComponent } from './user-profile-create-form/user-profile-create-form.component';
import { UserProfileChangePasswordComponent } from './user-profile-change-password/user-profile-change-password.component';
import { UserProfileChangePasswordFormComponent } from './user-profile-change-password-form/user-profile-change-password-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    LoginComponent,
    LoginFormComponent,
    UserProfileComponent,
    UserProfileEditFormComponent,
    UserProfileEditComponent,
    UserProfileCreateComponent,
    UserProfileCreateFormComponent,
    UserProfileChangePasswordComponent,
    UserProfileChangePasswordFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        allowedDomains: ["localhost:8000"],
        // disallowedRoutes: ["http://example.com/examplebadroute/"],
        tokenGetter: () => {
          return localStorage.getItem("user_session");
        }
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
