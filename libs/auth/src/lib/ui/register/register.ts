import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Register {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  registerForm = this.fb.group({});

  onSubmit() {
    console.log('submit');
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
