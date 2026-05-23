import { computed } from '@angular/core';
import { signalStoreFeature, type, withComputed } from '@ngrx/signals';
import { CampaignsState } from './campaigns.state';

export function withCampaignsSelectors() {
  return signalStoreFeature(
    { state: type<CampaignsState>() },
    withComputed((store) => ({
      allCampaigns: computed(() => store.allCampaigns()),
      userCampaigns: computed(() => store.userCampaigns()),
      isLoading: computed(() => store.loading()),
    })),
  );
}
