import { computed } from '@angular/core';
import { signalStoreFeature, type, withComputed } from '@ngrx/signals';
import { CampaignsApiService } from '../campaigns-api.service';
import { FilterOption } from '@teamfund/shared';
import { CampaignsState } from './campaigns.state';

export function withCampaignsSelectors() {
  return signalStoreFeature(
    {
      state: type<CampaignsState>(),
      props: type<{ campaignsApi: CampaignsApiService }>(),
    },

    withComputed((store) => ({
      allCampaigns: computed(() => {
        const campaigns = store.allCampaigns();
        return campaigns;
      }),

      allParticipants: computed(() => {
        const participants = store.allParticipants();
        return participants;
      }),

      filteredCampaignsByTier: computed(() => {
        const filterOption: FilterOption = store.discoverFilterOption();

        if (filterOption === 'all') {
          return store.allCampaigns();
        }

        return store.allCampaigns().filter((c) => c.tier === filterOption);
      }),

      isLoading: computed(() => store.loading()),

      currentUserId: computed(() => store.campaignsApi.session()?.user.id ?? null),
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

      supportedCampaigns: computed(() => {
        const userId = store.campaignsApi.session()?.user.id;

        if (!userId) {
          return [];
        }

        const supportedCampaignIds = new Set(
          store
            .allParticipants()
            .filter((participant) => participant.userId === userId)
            .map((participant) => participant.campaignId),
        );

        return store.allCampaigns().filter((campaign) => supportedCampaignIds.has(campaign.id));
      }),
    })),

    withComputed((store) => ({
      activeInitiativesCount: computed(() => store.getUserCampaigns().filter((c) => c.status === 'active').length),

      supportedCampaignsCount: computed(() => store.supportedCampaigns().length),
    })),
  );
}
