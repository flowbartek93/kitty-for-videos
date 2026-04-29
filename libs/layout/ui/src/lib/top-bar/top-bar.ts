import { Component, inject, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'lib-top-bar',
  imports: [RouterLink],
  templateUrl: './top-bar.html',
})
export class TopBar {
  readonly logoutClicked = output<void>();

  currentUser = input<string>('');

  public logout() {
    this.logoutClicked.emit();
  }
}
