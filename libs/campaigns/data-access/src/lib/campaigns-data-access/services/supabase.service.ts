import { inject, Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_CONFIG } from '../../auth';

export function provideSupabaseConfig(config: { url: string; key: string }) {
  return [
    {
      provide: SUPABASE_CONFIG,
      useValue: config,
    },
  ];
}

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabaseConfig = inject(SUPABASE_CONFIG);
  private supabaseClient: SupabaseClient;

  constructor() {
    this.supabaseClient = createClient(
      this.supabaseConfig.url,
      this.supabaseConfig.key,
    );
  }
}
