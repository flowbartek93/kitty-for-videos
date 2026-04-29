import { ChangeDetectionStrategy, Component, inject, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-settings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-settings.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSettingsComponent {
  readonly #injector = inject(Injector);
}
