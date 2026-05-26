import { computed } from '@angular/core';
import { signalStoreFeature, type, withComputed } from '@ngrx/signals';
import { CampaignsApiService } from '../campaigns-api.service';
import { CampaignsState } from './campaigns.state';

export function withCampaignsSelectors() {
  return signalStoreFeature(
    {
      state: type<CampaignsState>(),
      props: type<{ campaignsApi: CampaignsApiService }>(),
    },

    withComputed((store) => ({
      allCampaigns: computed(() => store.allCampaigns()),

      isLoading: computed(() => store.loading()),
    })),

    withComputed((store) => ({
      getUserCampaigns: computed(() => {
        const userId = store.campaignsApi.session()?.user.id;

        if (!userId) {
          return [];
        }

        const allCampaigns = store.allCampaigns();

        const userCampaigns = allCampaigns.filter((campaign) => campaign.creatorId === userId);
        return userCampaigns;
      }),
    })),
  );
}
