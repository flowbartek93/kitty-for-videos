import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_CLIENT, SUPABASE_USER_CLIENT } from './supabase.const';

@Injectable()
export class SupabaseService {
  constructor(
    @Inject(SUPABASE_CLIENT) private readonly supabase: SupabaseClient,
    @Inject(SUPABASE_USER_CLIENT) private readonly userSupabase: SupabaseClient,
  ) {}

  get client() {
    return this.supabase;
  }

  get userClient() {
    return this.userSupabase;
  }
}
