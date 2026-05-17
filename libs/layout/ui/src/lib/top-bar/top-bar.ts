import { Component, effect, inject, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserProfile } from '@teamfund/shared';

@Component({
  selector: 'lib-top-bar',
  imports: [RouterLink],
  templateUrl: './top-bar.html',
})
export class TopBar {
  readonly logoutClicked = output<void>();
  readonly avatarUrl = input<string>('');

  readonly currentProfile = input<UserProfile | null>(null);

  public logout() {
    this.logoutClicked.emit();
  }

  constructor() {
    effect(() => {
      console.log('Current profile in TopBar:', this.currentProfile());
    });
  }
}
