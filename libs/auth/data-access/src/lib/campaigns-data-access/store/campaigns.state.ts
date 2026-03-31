import { Campaign } from '@kitty-for-videos/models';
import { entityConfig, withEntities } from '@ngrx/signals/entities';

export const campaignsConfig = entityConfig({
  entity: {} as Campaign,
  selectId: (campaign) => campaign.id,
});

export const campaignsState = withEntities(campaignsConfig);

export type CampaignsState = {
  loading: boolean;
  error: string | null;
};

export const initialCampaignsState: CampaignsState = {
  loading: false,
  error: null,
};
