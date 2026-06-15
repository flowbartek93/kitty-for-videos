import { Component, inject, Signal } from '@angular/core';
import { Campaign } from '@teamfund/shared';
import { AuthService } from 'auth';
import { CampaignsApiService, CampaignsStore } from 'campaigns-data-access';

@Component({
  selector: 'lib-campaigns-feature-dashboard',
  imports: [],
  templateUrl: './campaigns-feature-dashboard.html',
})
export class CampaignsFeatureDashboard {
  readonly authSrv = inject(AuthService);
  readonly campaignsStore: CampaignsStore = inject(CampaignsStore);

  public profile = this.authSrv.getCurrentUser();
  public activeCampaigns: Signal<Campaign[]> = this.campaignsStore.allCampaigns;
}
