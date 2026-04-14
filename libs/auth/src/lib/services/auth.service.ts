import { inject, Injectable } from '@angular/core';
import { SupabaseClientService } from 'shared-util';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private supabase = inject(SupabaseClientService);

  getSession() {
    return this.supabase.client.auth.getSession().then((r) => r.data.session);
  }

  login(email: string, password: string) {
    return this.supabase.client.auth.signInWithPassword({ email, password });
  }

  logout() {
    return this.supabase.client.auth.signOut();
  }
}
