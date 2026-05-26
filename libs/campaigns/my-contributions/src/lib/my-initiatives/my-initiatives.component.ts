import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { Campaign } from '@teamfund/shared';
import { CampaignsStore } from 'campaigns-data-access';
import { CourseCardComponent } from '../shared/course-card/course-card.component';

@Component({
  selector: 'lib-my-initiatives',
  imports: [CourseCardComponent],
  templateUrl: './my-initiatives.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyInitiativesComponent {
  private readonly store = inject(CampaignsStore);

  readonly myCampaigns: Signal<Campaign[]> = this.store.getUserCampaigns;
}
