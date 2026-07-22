import { Module } from '@nestjs/common';
import { CurrenciesModule } from './currencies/currencies.module';

@Module({
  controllers: [],
  providers: [],
  imports: [CurrenciesModule],
  exports: [CurrenciesModule],
})
export class SpecialOperationsModule {}
