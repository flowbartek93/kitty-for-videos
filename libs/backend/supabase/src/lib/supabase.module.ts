import { ConfigurableModuleBuilder, Module, Provider } from '@nestjs/common';
import { SUPABASE_CLIENT } from './shared/supabase.const';
import { createClient } from '@supabase/supabase-js';
import { SupabaseService } from './shared/supabase.service';

export interface SupabaseModuleOptions {
  url: string;
  serviceRoleKey: string;
}

export const { MODULE_OPTIONS_TOKEN, ConfigurableModuleClass } = new ConfigurableModuleBuilder<SupabaseModuleOptions>()
  .setClassMethodName('forRoot')
  .build();

const supapaseProvider: Provider = {
  provide: SUPABASE_CLIENT,
  useFactory: (options: SupabaseModuleOptions) => {
    const url = options.url;
    const key = options.serviceRoleKey;

    return createClient(url, key, {});
  },
  inject: [MODULE_OPTIONS_TOKEN],
};

@Module({
  controllers: [],
  providers: [supapaseProvider, SupabaseService],
  exports: [SupabaseService],
})
export class SupabaseModule extends ConfigurableModuleClass {}
