import { TransitiveCompileNgModuleMetadata } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss', '../auth.style.scss'],
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  hide: boolean = true;

   authState: any = null;

  constructor(
    public fb: FormBuilder,
    public auth: AuthService,
    public router: Router
  ) {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: [
        '',
        [
          // Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[a-zA-Z0-9]+)$'),
          Validators.minLength(6),
          Validators.maxLength(30),
        ],
      ],
    });
  }

  ngOnInit() {}

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  signUp() {
    return this.auth
      .emailSignUp(this.email.value, this.password.value)
      .then((user) => {
        if (this.signUpForm.valid) {
          this.router.navigate(['/signup']);
        }
      });
  }
}
