import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserStore } from 'user-data-access';
import { CampaignsStore } from 'campaigns-data-access';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './user-info.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInfoComponent {
  readonly store = inject(UserStore);
  private readonly campaignsStore = inject(CampaignsStore);

  readonly myInitiatives = this.campaignsStore.getUserCampaigns;
  readonly supportedMissions = this.campaignsStore.supportedCampaigns;

  // Aktywne zbiórki = aktywne zrzutki założone przez usera; "Zorganizowane" = wszystkie założone
  readonly activeInitiativesCount = this.campaignsStore.activeInitiativesCount;
  readonly organizedCount = computed(() => this.myInitiatives().length);
}
