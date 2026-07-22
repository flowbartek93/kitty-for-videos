export type CampaignStatus = 'active' | 'finalized';

/**
 * Waluta, w której instruktor podaje cenę szkolenia (kurs źródłowy).
 * Uczestnicy zawsze wpłacają w PLN — dlatego zawsze przechowujemy też
 * kwotę przeliczoną na PLN (totalCostPLN). Dla waluty PLN kwota
 * przeliczona jest równa cenie bazowej; dla walut obcych przeliczenie
 * dokonuje się po stronie serwera wg aktualnego kursu.
 */
export enum CurrencyEnum {
  PLN = 'PLN',
  USD = 'USD',
  EUR = 'EUR',
  RUB = 'RUB',
  GBP = 'GBP',
}

export const CURRENCY_OPTIONS = [
  CurrencyEnum.PLN,
  CurrencyEnum.USD,
  CurrencyEnum.EUR,
  CurrencyEnum.RUB,
  CurrencyEnum.GBP,
] as const;

export interface Campaign {
  id: string;
  creatorId: string; // ID usera, który założył zrzutkę
  title: string;
  description: string;
  videoUrl: string; // Link do materiału (np. Vimeo, site instruktora)
  totalCostUSD: number; // Cena bazowa szkolenia w walucie źródłowej (currency)
  currency: CurrencyEnum; // Waluta ceny bazowej
  totalCostPLN?: number; // Cena bazowa przeliczona na PLN (kurs liczony po stronie serwera)
  status: CampaignStatus;
  createdAt: string;
  deadline?: string; // Opcjonalnie: do kiedy zbieramy
  previewImageUrl?: string;
  tier: TierEnum;
}

export enum TierEnum {
  tier1 = 'tier1',
  tier2 = 'tier2',
  tier3 = 'tier3',
}

export const FILTER_OPTIONS = ['all', 'tier1', 'tier2', 'tier3'] as const;
export type FilterOption = (typeof FILTER_OPTIONS)[number];

export interface CampaignWithStats extends Campaign {
  isSupportedByUser: boolean;
  participantsCount?: number;
  costPerPersonUSD?: number; // koszt/os. w walucie źródłowej
  costPerPersonPLN?: number; // koszt/os. przeliczony na PLN
}

export interface LinkPreview {
  title: string;
  description: string;
  image: string;
}

export interface CreateCampaignPayload {
  title: string;
  courseUrl: string;
  minParticipants: number;
  price: number;
  currency: CurrencyEnum;
  priorityTier: TierEnum;
  description: string;
  preview_title: string;
  preview_description: string;
  preview_image_url: string;
}

export interface CreateCampaignBody {
  id: string;
  title: string;
  courseUrl: string;
  minParticipants: number;
  price: number;
  currency: CurrencyEnum;
  priorityTier: TierEnum;
  description: string;
  preview_title: string;
  preview_description: string;
  preview_image_url: string;
}
