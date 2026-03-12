import { Component, inject } from '@angular/core';
import { CampaignsStore } from '@kitty-for-videos/campaigns-data-access';
@Component({
  selector: 'lib-campaigns-feature-dashboard',
  imports: [],
  templateUrl: './campaigns-feature-dashboard.html',
  styleUrl: './campaigns-feature-dashboard.css',
})
export class CampaignsFeatureDashboard {
  protected readonly store = inject(CampaignsStore);
}
