import { Component, inject, Signal } from '@angular/core';
import { CampaignsStore } from 'campaigns-data-access';
import { MyInitiativesComponent } from '../my-initiatives/my-initiatives.component';
import { CourseCardComponent } from '../shared/course-card/course-card.component';
import { Campaign } from '@teamfund/shared';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'lib-supported-initiatives',
  imports: [MyInitiativesComponent, CourseCardComponent, RouterOutlet, RouterLinkWithHref],
  templateUrl: './supported-initiatives.html',
})
export class SupportedInitiativesComponent {
  private readonly store = inject(CampaignsStore);

  readonly myCampaigns: Signal<Campaign[]> = this.store.getUserCampaigns;
}
