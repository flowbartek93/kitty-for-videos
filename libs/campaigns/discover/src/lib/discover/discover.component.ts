import { Component, computed, inject, Signal } from '@angular/core';
import { CampaignsStore } from 'campaigns-data-access';
import { Campaign, CampaignWithStats, Participant } from '@teamfund/shared';
import { CourseCardComponent } from '../shared/components/course-card/course-card.component';
import { DiscoverToolbarComponent } from './discover-toolbar/discover-toolbar.component';
import { AuthService } from 'auth';

@Component({
  selector: 'lib-discover',
  imports: [CourseCardComponent, DiscoverToolbarComponent],
  templateUrl: './discover.component.html',
})
export class DiscoverComponent {
  private readonly store = inject(CampaignsStore);

  private readonly filteredCampaignsByTier = this.store.filteredCampaignsByTier;

  private readonly currentUser = inject(AuthService).getCurrentUser();

  private readonly participants = this.store.allParticipants;

  readonly campaigns: Signal<CampaignWithStats[]> = computed(() => {
    const filtered = this.filteredCampaignsByTier();
    const participants: Participant[] = this.participants();
    const userId = this.currentUser()?.id;

    const calculatedCampaigns: CampaignWithStats[] = filtered.map((c, _, campaigns) => ({
      ...c,
      isSupporedByUser: participants.some((p) => p.campaignId === c.id && p.userId === userId),
    }));

    return calculatedCampaigns;
  });
}
