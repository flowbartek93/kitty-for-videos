import { Component, inject } from '@angular/core';
import { CampaignsStore } from 'campaigns-data-access';

@Component({
  selector: 'lib-discover',
  imports: [],
  templateUrl: './discover.component.html',
})
export class DiscoverComponent {
  readonly store = inject(CampaignsStore);

  constructor() {
    this.store.loadAllCampaigns();
  }
}
