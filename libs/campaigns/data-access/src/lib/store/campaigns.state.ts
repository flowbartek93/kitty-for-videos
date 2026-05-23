import { Campaign } from '@teamfund/shared';

export type CampaignsState = {
  loading: boolean;
  error: string | null;
  allCampaigns: Campaign[];
  userCampaigns: Campaign[];
};

export const initialCampaignsState: CampaignsState = {
  loading: false,
  error: null,
  allCampaigns: [],
  userCampaigns: [],
};
