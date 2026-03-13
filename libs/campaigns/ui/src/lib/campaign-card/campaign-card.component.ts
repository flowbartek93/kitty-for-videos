import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'lib-campaign-card',
  imports: [],
  templateUrl: './campaign-card.component.html',
})
export class CampaignCardComponent {
  campaign = input.required<any>();

  // Przykładowa logika - potem weźmiemy realne currentAmount z bazy
  progress = computed(() => {
    const c = this.campaign();
    return c.totalCostUSD > 0 ? Math.round((750 / c.totalCostUSD) * 100) : 0;
  });
}
