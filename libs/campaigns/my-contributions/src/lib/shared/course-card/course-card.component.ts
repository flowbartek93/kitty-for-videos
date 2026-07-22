import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Campaign } from '@teamfund/shared';
import { CampaignsStore } from 'campaigns-data-access';

@Component({
  selector: 'lib-contribution-course-card',
  imports: [RouterLink],
  templateUrl: './course-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseCardComponent {
  private readonly store = inject(CampaignsStore);

  readonly campaign = input.required<Campaign>();

  /**
   * Edycja tylko wtedy, gdy mamy pewność, że to zbiórka zalogowanego usera
   * (ta sama karta bywa użyta również dla cudzych, wspieranych misji).
   */
  protected readonly isOwner = computed(() => {
    const userId = this.store.currentUserId();
    return !!userId && this.campaign().creatorId === userId;
  });
}
