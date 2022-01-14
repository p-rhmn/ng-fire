import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  email: string;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {}

  resetPassword(email: string) {
    return this.auth.resetPassword(this.email).then(() => {
      this.router.navigate(['/signin'])
    })
  }
}
