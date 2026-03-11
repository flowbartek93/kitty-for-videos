import { signalStoreFeature, type, withComputed } from '@ngrx/signals';
import { CampaignsState } from './campaigns.state';
import { computed } from '@angular/core';

export function withCapmaignsSelectors() {
  return signalStoreFeature(
    { state: type<CampaignsState>() },

    withComputed((store) => {
      return {
        allCampaigns: computed(() => {
          return [];
        }),
      };
    }),
  );
}
