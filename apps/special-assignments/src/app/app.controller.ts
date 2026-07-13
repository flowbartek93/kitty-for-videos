import { Controller, Get, Inject, InternalServerErrorException } from '@nestjs/common';
import { AppService } from './app.service';
import { SupabaseClient } from '@supabase/supabase-js';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient,
  ) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('supabase')
  async connectSb() {
    console.log('Target URL:', process.env['SUPABASE_URL']);
    console.log('Target URL:', process.env['SUPABASE_SERVICE_ROLE_KEY']);

    const { data, error } = await this.supabase.from('campaigns').select('*'); // Tabela zdefiniowana w Twoich modelach

    if (error) {
      throw new InternalServerErrorException(`Supabase handshake failed: ${error.message}`);
    }

    return {
      status: 'OPERATIONAL',
      message: 'Connection link with Supabase secured.',
      payloadSample: data,
    };
  }
}
