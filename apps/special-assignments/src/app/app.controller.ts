import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { AppService } from './app.service';
import { SupabaseService } from '@teamfund/backend-supabase';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly supabaseSrv: SupabaseService,
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
    const response = await fetch('https://api.nbp.pl/api/exchangerates/tables/A/?format=json');

    if (!response.ok) {
      throw new InternalServerErrorException(`NBP API request failed: ${response.status}`);
    }

    return response.json();
  }
}
