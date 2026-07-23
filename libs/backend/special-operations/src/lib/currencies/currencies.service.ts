import { Injectable } from '@nestjs/common';

@Injectable()
export class CurrenciesService {
  async fetchNbpCurrencies() {
    const response: Response = await fetch('https://api.nbp.pl/api/exchangerates/tables/A/?format=json');

    return response;
  }
}
