import { Component, inject, input, output } from '@angular/core';

@Component({
  selector: 'lib-top-bar',
  imports: [],
  templateUrl: './top-bar.html',
})
export class TopBar {
  readonly logoutClicked = output<void>();

  currentUser = input<string>('');

  public logout() {
    this.logoutClicked.emit();
  }
}
