import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { NbpTableDto } from './dto/exchange-rates.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CurrenciesService {
  async fetchNbpCurrencies() {
    const response: Response = await fetch('https://api.nbp.pl/api/exchangerates/tables/A/?format=json');

    if (!response.ok) {
      throw new InternalServerErrorException(`NBP API request failed: ${response.status}`);
    }

    const raw: unknown = await response.json();

    const tables: NbpTableDto = plainToInstance(NbpTableDto, raw);

    return tables;
  }
}
