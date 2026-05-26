import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lib-course-card',
  imports: [],
  templateUrl: './course-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseCardComponent {}
