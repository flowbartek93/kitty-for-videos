import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'lib-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private fb = inject(FormBuilder);
  private authSrv = inject(AuthService);

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  public loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  public onSubmit() {
    const email = this.email?.value;
    const password = this.password?.value;

    if (email && password) {
      this.authSrv.login(email, password);
    }
  }
}
