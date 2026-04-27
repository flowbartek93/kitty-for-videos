import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PopupService } from '@teamfund/shared';
import { AuthService } from '../../services/auth.service';
import { from, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthResponse } from '@supabase/supabase-js';
@Component({
  selector: 'lib-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Register {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private popUpSrv = inject(PopupService);
  private authSrv = inject(AuthService);

  private destroyRef = inject(DestroyRef);

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  get fullName() {
    return this.registerForm.get('fullName');
  }

  registerForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    fullName: ['', Validators.required],
    terms: [false, Validators.requiredTrue],
  });

  onSubmit() {
    const email = this.email?.value;
    const password = this.password?.value;
    const confirmPassword = this.confirmPassword?.value;
    const fullName = this.fullName?.value;

    if (email && password && confirmPassword && fullName) {
      if (password !== confirmPassword) {
        this.popUpSrv.show('Hasła muszą być takie same');
        return;
      }
    }

    return from(this.authSrv.registerUser({ email: email ?? '', password: password ?? '' }, fullName ?? ''))
      .pipe(
        tap(({ data, error }) => {
          if (data.session && data.user) {
            this.router.navigate(['/dashboard']);
          } else {
            this.router.navigate(['/register']);
          }

          if (error) {
            this.popUpSrv.show(error.message);
          }
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
