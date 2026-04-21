import { inject, Injectable } from '@angular/core';
import { SupabaseClientService } from '@teamfund/shared';
import { Router } from '@angular/router';
import { AuthStore } from '../store/auth.store';
import { Session } from '@supabase/supabase-js';
import { from } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  protected supabase = inject(SupabaseClientService);
  private authStore = inject(AuthStore);

  getClientAuth() {
    return this.supabase.client.auth;
  }

  login(email: string, password: string) {
    return this.supabase.client.auth.signInWithPassword({ email, password });
  }

  logout() {
    return this.supabase.client.auth.signOut();
  }

  setSession(session: Session) {
    this.authStore.setSession(session);
  }

  getStoreSession() {
    return this.authStore.currentSession();
  }

  getSessionStorageSession() {
    return from(this.supabase.client.auth.getSession());
  }
}
