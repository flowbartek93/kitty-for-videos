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

/**
 * TYMCZASOWE, fejkowe kursy walut (ile PLN za 1 jednostkę).
 * Docelowo zastąpione realnymi kursami pobieranymi po stronie serwera (nest).
 */
export const MOCK_EXCHANGE_RATES: ExchangeRates = {
  [CurrencyEnum.PLN]: 1,
  [CurrencyEnum.USD]: 4.0,
  [CurrencyEnum.EUR]: 4.3,
  [CurrencyEnum.RUB]: 0.045,
  [CurrencyEnum.GBP]: 5.1,
};

export const initialCampaignsState: CampaignsState = {
  loading: false,
  error: null,
  allCampaigns: [],
  userCampaigns: [],
  allParticipants: [],
  discoverFilterOption: 'all',
  exchangeRates: MOCK_EXCHANGE_RATES,
};
