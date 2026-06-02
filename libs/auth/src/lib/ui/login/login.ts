import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { catchError, EMPTY, from, tap } from 'rxjs';

import { PopupService } from '@teamfund/shared';

import { form, FormField, required } from '@angular/forms/signals';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'lib-login',
  imports: [FormField],
  templateUrl: './login.html',
})
export class Login {
  private authSrv = inject(AuthService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  private popupSrv = inject(PopupService);

  public loginModel = signal({
    email: '',
    password: '',
  });

  public loginForm = form(this.loginModel, (path) => {
    required(path.email, { message: 'Wprowadź adres email' });
    required(path.password, { message: 'Wprowadź hasło' });
  });

  public onSubmit(event: Event) {
    event.preventDefault();
    const { email, password } = this.loginModel();

    if (this.loginForm().invalid()) return;

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
          catchError(() => {
            return EMPTY;
          }),
          takeUntilDestroyed(this.destroyRef),
        )
        .subscribe();
    }
  }

  public onRegisterNavigation() {
    this.router.navigate(['/register']);
  }
}
