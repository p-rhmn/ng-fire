import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';

import { AuthModule } from './auth/auth.module';

const routes: Routes = [
  { path: '', redirectTo: '/signup', pathMatch: 'full' },
  // {
  //   path: '',
  //   loadChildren: ,
  // },
  // { path: 'signin', component: SigninComponent, data: { title: 'Sign in' } },
  // { path: 'signup', component: SignupComponent, data: { title: 'Sign up' } },
  // {
  //   path: 'reset-password',
  //   component: ResetPasswordComponent,
  //   data: { title: 'Reset password' },
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
