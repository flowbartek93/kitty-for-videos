import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { AppService } from './app.service';
import { SupabaseService } from '@teamfund/backend-supabase';
import { CurrenciesService, NbpTableDto } from '@teamfund/special-operations';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly supabaseSrv: SupabaseService,
    private readonly currenciesSrv: CurrenciesService,
  ) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('supabase')
  async connectSb() {
    const { data, error } = await this.supabaseSrv.client.from('campaigns').select('*');

    if (error) {
      throw new InternalServerErrorException(`Supabase handshake failed: ${error.message}`);
    }

    return {
      status: 'OPERATIONAL',
      message: 'Connection link with Supabase secured.',
      payloadSample: data,
    };
  }

  @Get('currencies')
  async getCurrencies() {
    const response: Promise<NbpTableDto> = await this.currenciesSrv.fetchNbpCurrencies();

    if (!response.ok) {
      throw new InternalServerErrorException(`NBP API request failed: ${response.status}`);
    }

    return response.json();
  }
}
