import { computed } from '@angular/core';
import { signalStoreFeature, withComputed } from '@ngrx/signals';

export function withCampaignsSelectors() {
  return signalStoreFeature(
    withComputed((state) => ({
      allCampaigns: computed(() => {
        return [];
      }),
    })),
  );
}
