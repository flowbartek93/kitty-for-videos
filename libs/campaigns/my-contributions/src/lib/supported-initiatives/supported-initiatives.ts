import { Component, inject, Signal } from '@angular/core';
import { CampaignsStore } from 'campaigns-data-access';
import { CourseCardComponent } from '../shared/course-card/course-card.component';
import { Campaign } from '@teamfund/shared';

@Component({
  selector: 'lib-supported-initiatives',
  imports: [CourseCardComponent],
  templateUrl: './supported-initiatives.html',
})
export class SupportedInitiativesComponent {
  private readonly store = inject(CampaignsStore);

  readonly myCampaigns: Signal<Campaign[]> = this.store.getUserCampaigns;
}
