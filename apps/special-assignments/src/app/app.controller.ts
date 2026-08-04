import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
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
  @ApiOkResponse({ type: NbpTableDto, isArray: true })
  async getCurrencies() {
    return await this.currenciesSrv.fetchNbpCurrencies();
  }
}
