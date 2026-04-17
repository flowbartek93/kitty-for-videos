import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { Session } from '@supabase/supabase-js';
import { SupabaseClientService } from 'shared-util';

interface AuthState {
  session: Session | null;
  user: unknown;
  isLoading: boolean;
}

const initialAuthState: AuthState = {
  session: null,
  user: null,
  isLoading: true,
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withDevtools('auth'),
  withState<AuthState>(initialAuthState),
  withMethods((store) => ({
    setSession(newSession: Session | null) {
      patchState(store, { session: newSession, isLoading: false, user: newSession?.user ?? null });
    },
  })),
  withComputed((store) => ({
    currentSession: computed(() => store.session()),
    loaded: computed(() => !store.isLoading()),
  })),
  withHooks((store) => {
    const supabase = inject(SupabaseClientService);
    return {
      onInit() {
        supabase.client.auth.onAuthStateChange((_event, session) => {
          store.setSession(session);
        });
      },
    };
  }),
);
