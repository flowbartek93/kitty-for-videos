import { Module, Provider } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SupabaseModule } from '@teamfund/backend-supabase';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      //praca z .env
      envFilePath: '.env',
      isGlobal: true,
      // validationSchema: Joi.object({ SUPABASE_URL: Joi.required(), SUPABASE_KEY: Joi.required() }),
    }),
    SupabaseModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        return {
          serviceRoleKey: config.getOrThrow('SUPABASE_SERVICE_ROLE_KEY'),
          url: config.getOrThrow('SUPABASE_URL'),
          anonKey: config.getOrThrow('SUPABASE_KEY'),
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
