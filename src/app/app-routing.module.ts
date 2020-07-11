import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserProfileResolverService } from './user-profile-resolver.service';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuardService } from './auth-guard.service';
import { GuestGuardService } from './guest-guard.service';
import { UserProfileEditComponent } from './user-profile-edit/user-profile-edit.component';
import { UserProfileCreateComponent } from './user-profile-create/user-profile-create.component';
import { UserProfileChangePasswordComponent } from './user-profile-change-password/user-profile-change-password.component';


const routes: Routes = [

  { path: '', component: HomeComponent },

  { path: 'login', component: LoginComponent, canActivate: [GuestGuardService] },
  { path: 'register', component: UserProfileCreateComponent, canActivate: [GuestGuardService] },

  {
    path: 'users',
    children: [
      {
        path: 'me',
        component: UserProfileComponent,
        resolve: { user : UserProfileResolverService },
        canActivate: [AuthGuardService]
      },
      {
        path: 'edit',
        component: UserProfileEditComponent,
        resolve: { user : UserProfileResolverService },
        canActivate: [AuthGuardService]
      },
      {
        path: 'create', // same as 'register' above
        component: UserProfileCreateComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'change-password',
        component: UserProfileChangePasswordComponent,
        resolve: { user : UserProfileResolverService },
        canActivate: [AuthGuardService]
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
