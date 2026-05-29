import { Component, inject, Signal } from '@angular/core';
import { CampaignsStore } from 'campaigns-data-access';
import { Campaign } from '@teamfund/shared';
import { CourseCardComponent } from '../shared/components/course-card/course-card.component';
import { DiscoverToolbarComponent } from './discover-toolbar/discover-toolbar.component';

@Component({
  selector: 'lib-discover',
  imports: [CourseCardComponent, DiscoverToolbarComponent],
  templateUrl: './discover.component.html',
})
export class DiscoverComponent {
  private readonly store = inject(CampaignsStore);

  readonly campaigns: Signal<Campaign[]> = this.store.filteredCampaignsByTier;
}
