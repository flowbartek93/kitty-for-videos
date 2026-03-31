import { Component, inject } from '@angular/core';
import { CampaignsStore } from 'libs/auth/data-access/src';
import {
  CampaignCardComponent,
  ProfileCardComponent,
  SidebarComponent,
  StatCardComponent,
} from '@kitty-for-videos/campaigns-ui';
@Component({
  selector: 'lib-campaigns-feature-dashboard',
  imports: [StatCardComponent, ProfileCardComponent, CampaignCardComponent, SidebarComponent],
  templateUrl: './campaigns-feature-dashboard.html',
})
export class CampaignsFeatureDashboard {
  // protected readonly store = inject(CampaignsStore);
}
