import { Component, computed, inject, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Campaign } from '@teamfund/shared';
import { AuthService } from 'auth';
import { CampaignsStore } from 'campaigns-data-access';

const RECENT_CAMPAIGNS_LIMIT = 3;

@Component({
  selector: 'lib-campaigns-feature-dashboard',
  imports: [RouterLink],
  templateUrl: './campaigns-feature-dashboard.html',
})
export class CampaignsFeatureDashboard {
  readonly authSrv = inject(AuthService);
  readonly campaignsStore: CampaignsStore = inject(CampaignsStore);

  public profile = this.authSrv.getCurrentUser();

  private readonly myCampaigns = this.campaignsStore.getUserCampaigns;
  public activeCampaignsCount = this.campaignsStore.activeInitiativesCount;
  public organizedCount = computed(() => this.myCampaigns().length);

  public recentCampaigns: Signal<Campaign[]> = computed(() =>
    [...this.myCampaigns()]
      .sort((a, b) => (b.createdAt ?? '').localeCompare(a.createdAt ?? ''))
      .slice(0, RECENT_CAMPAIGNS_LIMIT),
  );

  public hasMoreCampaigns = computed(() => this.organizedCount() > RECENT_CAMPAIGNS_LIMIT);
}
