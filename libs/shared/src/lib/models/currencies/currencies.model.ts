import { ExchangeRates } from '@teamfund/shared';

export interface NbpRate {
  currency: string;
  code: string;
  mid: number;
}

export interface NbpTable {
  table: string;
  no: string;
  effectiveDate: string;
  rates: NbpRate[];
}

export const mapToProperCurrencies = (rate: NbpRate[]): ExchangeRates => {
  return rate.reduce<ExchangeRates>((acc, curr) => {
    const code = curr.code;

    if (code === 'USD' || code === 'GBP' || code === 'EUR' || code === 'PLN' || code === 'RUB') {
      acc[code] = curr.mid;
      return acc;
    }

    return acc;
  }, {} as ExchangeRates);
};
