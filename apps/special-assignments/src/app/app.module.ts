import { Module, Provider } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// const supapaseProvider: Provider = {
//   provide: 'SUPABASE_CLIENT',
//   useFactory: (configSrv: ConfigService) => {
//     const url = configSrv.get<string>('SUPABASE_URL');
//     const key = configSrv.get<string>('SUPABASE_SERVICE_ROLE_KEY');

//     if (!url || !key) {
//       throw new Error('CRITICAL BREACH: Supabase env credentials completely unreadable.');
//     }

//     return createClient(url, key, {});
//   },
//   inject: [ConfigService],
// };

@Module({
  imports: [
    ConfigModule.forRoot({
      //praca z .env
      envFilePath: '.env',
      isGlobal: true,
      // validationSchema: Joi.object({ SUPABASE_URL: Joi.required(), SUPABASE_KEY: Joi.required() }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
