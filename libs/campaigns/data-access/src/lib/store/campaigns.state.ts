import { Campaign, CurrencyEnum, ExchangeRates, FilterOption, Participant } from '@teamfund/shared';

export type CampaignsState = {
  loading: boolean;
  error: string | null;
  allCampaigns: Campaign[];
  userCampaigns: Campaign[];
  allParticipants: Participant[];
  discoverFilterOption: FilterOption;
  exchangeRates: ExchangeRates;
};

export const INITIAL_RATES: ExchangeRates = {
  [CurrencyEnum.PLN]: 0,
  [CurrencyEnum.USD]: 0,
  [CurrencyEnum.EUR]: 0,
  [CurrencyEnum.RUB]: 0,
  [CurrencyEnum.GBP]: 0,
};

export const initialCampaignsState: CampaignsState = {
  loading: false,
  error: null,
  allCampaigns: [],
  userCampaigns: [],
  allParticipants: [],
  discoverFilterOption: 'all',
  exchangeRates: INITIAL_RATES,
};
