import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CampaignsStore } from 'campaigns-data-access';

@Component({
  selector: 'lib-main-contributions',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, DecimalPipe],
  templateUrl: './main-contributions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainContributionsComponent {
  private readonly store = inject(CampaignsStore);

  readonly activeInitiativesCount = this.store.supportedCampaignsCount;

  readonly totalSupportPLN = 0;
}
