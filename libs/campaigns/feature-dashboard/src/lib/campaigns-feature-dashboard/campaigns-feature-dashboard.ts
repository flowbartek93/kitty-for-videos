import { Component, inject } from '@angular/core';
import { CampaignsStore } from '@kitty-for-videos/campaigns-data-access';
import {
  CampaignCardComponent,
  ProfileCardComponent,
  StatCardComponent,
} from '@kitty-for-videos/campaigns-ui';
@Component({
  selector: 'lib-campaigns-feature-dashboard',
  imports: [StatCardComponent, ProfileCardComponent, CampaignCardComponent],
  templateUrl: './campaigns-feature-dashboard.html',
  styleUrl: './campaigns-feature-dashboard.css',
})
export class CampaignsFeatureDashboard {
  protected readonly store = inject(CampaignsStore);
}
