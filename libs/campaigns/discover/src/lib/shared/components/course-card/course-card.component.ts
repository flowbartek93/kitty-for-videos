import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { Campaign, CampaignWithStats, ConfirmDialogService } from '@teamfund/shared';

@Component({
  selector: 'lib-course-card',
  imports: [DatePipe],
  templateUrl: './course-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseCardComponent {
  private readonly confirmDialog = inject(ConfirmDialogService);

  readonly campaign = input.required<CampaignWithStats>();

  readonly support = output<string>();
  readonly unsupport = output<string>();

  supportMission(campaignId: string) {
    this.support.emit(campaignId);
  }

  async requestLeave(campaignId: string) {
    const confirmed = await this.confirmDialog.confirm({
      title: 'Wycofanie wsparcia',
      message: 'Na pewno chcesz wycofać swoje wsparcie z tej misji? Tej akcji nie można cofnąć.',
      confirmLabel: 'Wycofaj wsparcie',
      cancelLabel: 'Anuluj',
    });

    if (confirmed) {
      this.unsupport.emit(campaignId);
    }
  }
}
