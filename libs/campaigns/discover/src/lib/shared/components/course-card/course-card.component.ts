import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Campaign, CampaignWithStats } from '@teamfund/shared';

@Component({
  selector: 'lib-course-card',
  imports: [DatePipe],
  templateUrl: './course-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseCardComponent {
  readonly campaign = input.required<CampaignWithStats>();
}
