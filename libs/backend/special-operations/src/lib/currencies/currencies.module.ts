import { Module } from '@nestjs/common';
import { CurrenciesService } from 'libs/backend/special-operations/src/lib/currencies/currencies.service';

@Module({
  controllers: [],
  providers: [CurrenciesService],
  exports: [CurrenciesService],
})
export class CurrenciesModule {}
