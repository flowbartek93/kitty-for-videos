import { Component, inject } from '@angular/core';
import { CampaignsStore } from 'campaigns-data-access';
import { CampaignCardComponent, ProfileCardComponent, SidebarComponent, StatCardComponent } from 'campaigns-ui';
@Component({
  selector: 'lib-campaigns-feature-dashboard',
  imports: [StatCardComponent, ProfileCardComponent, CampaignCardComponent, SidebarComponent],
  templateUrl: './campaigns-feature-dashboard.html',
})
export class CampaignsFeatureDashboard {
  // protected readonly store = inject(CampaignsStore);
}
