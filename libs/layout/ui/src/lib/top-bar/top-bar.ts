import { Component, effect, inject, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserProfile } from 'shared';
import { NotificationBell } from '../notification-bell/notification-bell';

@Component({
  selector: 'lib-top-bar',
  imports: [RouterLink, NotificationBell],
  templateUrl: './top-bar.html',
})
export class TopBar {
  readonly logoutClicked = output<void>();
  readonly avatarUrl = input<string>('');

  readonly currentProfile = input<UserProfile | null>(null);

  readonly showNotificationIndicator = input<boolean>(false);
  readonly notificationsCount = input<number>(0);
  readonly notificationsClicked = output<void>();

  public logout() {
    this.logoutClicked.emit();
  }
}
