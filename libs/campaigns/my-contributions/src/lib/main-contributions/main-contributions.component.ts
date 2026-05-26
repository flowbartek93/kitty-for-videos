import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'lib-main-contributions',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './main-contributions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainContributionsComponent {}
