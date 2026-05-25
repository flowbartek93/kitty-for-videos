import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Campaign } from '@teamfund/shared';

@Component({
  selector: 'lib-course-card',
  imports: [],
  templateUrl: './course-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseCardComponent {
  readonly campaign = input.required<Campaign>();
}
