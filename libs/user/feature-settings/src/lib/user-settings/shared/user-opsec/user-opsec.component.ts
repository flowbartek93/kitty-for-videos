import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-opsec',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-opsec.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserOpsecComponent {}
