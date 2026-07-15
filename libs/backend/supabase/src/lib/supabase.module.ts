import { ConfigurableModuleBuilder, Module, Provider, Scope } from '@nestjs/common';
import { SUPABASE_CLIENT, SUPABASE_USER_CLIENT } from './shared/supabase.const';
import { createClient } from '@supabase/supabase-js';
import { SupabaseService } from './shared/supabase.service';
import { REQUEST } from '@nestjs/core';

export interface SupabaseModuleOptions {
  url: string;
  anonKey?: string;
  serviceRoleKey?: string;
}

export const { MODULE_OPTIONS_TOKEN, ConfigurableModuleClass } = new ConfigurableModuleBuilder<SupabaseModuleOptions>()
  .setClassMethodName('forRoot')
  .build();

const supapaseProvider: Provider = {
  provide: SUPABASE_CLIENT,
  useFactory: (options: SupabaseModuleOptions) => {
    const url = options.url;
    const key = options.serviceRoleKey;

    return createClient(url, key ?? ' ', {});
  },
  inject: [MODULE_OPTIONS_TOKEN],
};

const supapaseUserProvider: Provider = {
  provide: SUPABASE_USER_CLIENT,
  useFactory: (options: SupabaseModuleOptions, req: any) => {
    const url = options.url;
    const key = options.anonKey;

    return createClient(url, key ?? '', {});
  },
  inject: [MODULE_OPTIONS_TOKEN, REQUEST],
  scope: Scope.REQUEST,
};

@Module({
  controllers: [],
  providers: [supapaseProvider, supapaseUserProvider, SupabaseService],
  exports: [SupabaseService],
})
export class SupabaseModule extends ConfigurableModuleClass {}
