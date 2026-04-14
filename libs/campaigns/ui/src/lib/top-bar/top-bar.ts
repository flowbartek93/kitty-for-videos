import { Component, output } from '@angular/core';

@Component({
  selector: 'lib-top-bar',
  imports: [],
  templateUrl: './top-bar.html',
})
export class TopBar {
  readonly logoutClicked = output<void>();

  public logout() {
    this.logoutClicked.emit();
  }
}
