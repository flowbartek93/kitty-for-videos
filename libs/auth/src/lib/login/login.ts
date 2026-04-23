import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { from, tap, catchError, EMPTY } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { PopupService } from '@teamfund/shared';

@Component({
  selector: 'lib-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
})
export class Login {
  private fb = inject(FormBuilder);
  private authSrv = inject(AuthService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);

  //serwis do dialogów
  private popupSrv = inject(PopupService);

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
      from(this.authSrv.login(email, password))
        .pipe(
          tap(({ data, error }) => {
            if (!error && data.session) {
              this.router.navigate(['/dashboard']);
            }

            if (error) {
              this.popupSrv.show('Błąd logowania');
            }
          }),
          catchError((err) => {
            return EMPTY;
          }),
          takeUntilDestroyed(this.destroyRef),
        )
        .subscribe();
    }
  }

  //sub na sejse
}
