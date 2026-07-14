import { ConfigurableModuleBuilder, Module, Provider } from '@nestjs/common';
import { SUPABASE_CLIENT } from './shared/supabase.const';
import { createClient } from '@supabase/supabase-js';

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

    if (!url || !key) {
      throw new Error('CRITICAL BREACH: Supabase env credentials completely unreadable.');
    }

    return createClient(url, key, {});
  },
  inject: [MODULE_OPTIONS_TOKEN],
};

@Module({
  controllers: [],
  providers: [supapaseProvider],
  exports: [],
})
export class SupabaseModule extends ConfigurableModuleClass {}
