import { Campaign, FilterOption, Participant } from '@teamfund/shared';

export type CampaignsState = {
  loading: boolean;
  error: string | null;
  allCampaigns: Campaign[];
  userCampaigns: Campaign[];
  allParticipants: Participant[];
  discoverFilterOption: FilterOption;
};

export const initialCampaignsState: CampaignsState = {
  loading: false,
  error: null,
  allCampaigns: [],
  userCampaigns: [],
  allParticipants: [],
  discoverFilterOption: 'all',
};
