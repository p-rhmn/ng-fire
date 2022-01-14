import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss', '../auth.style.scss'],
})
export class SigninComponent implements OnInit {
  signInForm: FormGroup;
  public hide: boolean = true;

  constructor(
    public fb: FormBuilder,
    public auth: AuthService,
    public router: Router
  ) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: [
        '',
        [
          /* Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[a-zA-Z0-9]+)$'),*/
          Validators.minLength(6),
          Validators.maxLength(30),
        ],
      ],
    });
  }

  ngOnInit() {}

  get email() {
    return this.signInForm.get('email');
  }

  get password() {
    return this.signInForm.get('password');
  }

  signIn() {
    return this.auth
      .emailSignIn(this.email.value, this.password.value)
      .then((user) => {
        if (this.signInForm.valid) {
          this.router.navigate(['/']);
        }
      });
  }
}
