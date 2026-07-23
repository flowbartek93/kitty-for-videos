import { Controller, Get, Inject, InternalServerErrorException } from '@nestjs/common';
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

  @Get('nest')
  nest() {
    return {
      body: 'odp z nesta',
    };
  }
}
