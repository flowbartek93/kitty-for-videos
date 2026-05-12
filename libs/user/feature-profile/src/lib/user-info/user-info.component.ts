import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserStore } from 'user-data-access';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './user-info.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInfoComponent {
  readonly store = inject(UserStore);
}
