import { Component, inject } from '@angular/core';
import { CampaignsStore } from 'campaigns-data-access';

@Component({
  selector: 'lib-my-contributions',
  imports: [],
  templateUrl: './my-contributions.html',
})
export class MyContributions {
  readonly store = inject(CampaignsStore);

  constructor() {
    this.store.loadUserCampaigns();
  }
}
