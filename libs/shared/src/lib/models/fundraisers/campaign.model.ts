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

/** Kurs = ile PLN kosztuje 1 jednostka danej waluty. */
export type ExchangeRates = Record<CurrencyEnum, number>;

/**
 * Przelicza kwotę z waluty źródłowej na PLN wg podanych kursów.
 * Dla PLN kurs = 1, więc kwota pozostaje ta sama.
 */
export function convertToPln(amount: number, currency: CurrencyEnum, rates: ExchangeRates): number {
  const rate = rates[currency] ?? 1;
  return Math.round(amount * rate * 100) / 100;
}

/**
 * Odwrotność convertToPln — odtwarza kwotę w walucie źródłowej z zapisanej
 * kwoty PLN (używane przy edycji, bo w bazie trzymamy tylko PLN).
 */
export function convertFromPln(amountPln: number, currency: CurrencyEnum, rates: ExchangeRates): number {
  const rate = rates[currency] ?? 1;
  if (!rate) {
    return 0;
  }
  return Math.round((amountPln / rate) * 100) / 100;
}

export interface Campaign {
  id: string;
  creatorId: string; // ID usera, który założył zrzutkę
  title: string;
  description: string;
  videoUrl: string; // Link do materiału (np. Vimeo, site instruktora)
  currency: CurrencyEnum; // Waluta źródłowa, w której instruktor podał cenę (metadana)
  totalCostPLN: number; // Cena zbiórki w PLN — jedyna zapisywana kwota (przeliczona z waluty źródłowej)
  minParticipants: number; // Minimalny stan osobowy potrzebny do uruchomienia zbiórki
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
  costPerPersonPLN?: number; // koszt/os. w PLN
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
