import { inject, Injectable } from '@angular/core';
import { SupabaseClientService } from '@teamfund/shared';
import { SignUpWithPasswordCredentials, AuthResponse } from '@supabase/supabase-js';

@Injectable({ providedIn: 'root' })
export class AuthService {
  protected supabase = inject(SupabaseClientService);

  login(email: string, password: string) {
    return this.supabase.client.auth.signInWithPassword({ email, password });
  }

  logout() {
    return this.supabase.client.auth.signOut();
  }

  registerUser(creds: SignUpWithPasswordCredentials, fullName: string): Promise<AuthResponse> {
    return this.supabase.client.auth.signUp({ ...creds, options: { data: { username: fullName } } });
  }
}
