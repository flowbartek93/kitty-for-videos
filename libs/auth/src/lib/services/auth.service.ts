import { inject, Injectable } from '@angular/core';
import { SupabaseClientService } from '@teamfund/shared';

@Injectable({ providedIn: 'root' })
export class AuthService {
  protected supabase = inject(SupabaseClientService);

  login(email: string, password: string) {
    return this.supabase.client.auth.signInWithPassword({ email, password });
  }

  logout() {
    return this.supabase.client.auth.signOut();
  }



}
