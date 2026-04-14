import { InjectionToken } from '@angular/core';

export interface SupabaseConfig {
  url: string;
  key: string;
}

export const SUPABASE_CONFIG = new InjectionToken<SupabaseConfig>('supabase.config');

export function provideSupabaseConfig(config: SupabaseConfig) {
  return [{ provide: SUPABASE_CONFIG, useValue: config }];
}
