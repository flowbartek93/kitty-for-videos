import { Campaign, Participant } from '@teamfund/shared';

export const FILTER_OPTIONS = ['all', 'tier1', 'tier2', 'tier3'] as const;
export type FilterOption = (typeof FILTER_OPTIONS)[number];

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
