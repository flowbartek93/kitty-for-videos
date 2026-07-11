import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      //praca z .env
      envFilePath: '.env',
      isGlobal: true,
      validationSchema: Joi.object({ SUPABASE_URL: Joi.required(), SUPABASE_KEY: Joi.required() }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
