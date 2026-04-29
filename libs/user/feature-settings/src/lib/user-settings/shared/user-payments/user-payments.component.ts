import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users-payments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-payments.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersPaymentsComponent {}
