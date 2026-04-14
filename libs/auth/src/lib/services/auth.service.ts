import { inject, Injectable } from '@angular/core';
import { SupabaseClientService } from 'shared-util';
import { AuthTokenResponsePassword } from '@supabase/supabase-js';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private supabase = inject(SupabaseClientService);

  getSession() {
    return this.supabase.client.auth.getSession().then((r) => r.data.session);
  }

  login(email: string, password: string) {
    return this.supabase.client.auth.signInWithPassword({ email, password });
  }

  setSession(data: AuthTokenResponsePassword) {
    return this.supabase.client.auth.setSession({
      access_token: data.data.session?.access_token ?? '',
      refresh_token: data.data.session?.refresh_token ?? '',
    });
  }
}
