import { inject, Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_CONFIG } from './supabase.config';

@Injectable({ providedIn: 'root' })
export class SupabaseClientService {
  private config = inject(SUPABASE_CONFIG);
  readonly client: SupabaseClient = createClient(this.config.url, this.config.key, {
    auth: { autoRefreshToken: true, persistSession: true, storage: window.sessionStorage },
  });
}
