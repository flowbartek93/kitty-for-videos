import { signalStoreFeature, type, withComputed } from '@ngrx/signals';
import { computed } from '@angular/core';
import { CampaignsState } from './campaigns.state';

export function withCampaignsSelectors() {
  return signalStoreFeature(
    { state: type<CampaignsState>() },
    withComputed((store) => ({
      allCampaigns: computed(() => []),
    })),
  );
}
