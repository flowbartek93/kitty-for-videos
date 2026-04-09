import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'lib-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private fb = inject(FormBuilder);

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('passwrod');
  }

  public loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  public onSubmit() {
    const email = this.email?.value;
    const password = this.password?.value;

    console.log(email);
    console.log(password);
  }
}
