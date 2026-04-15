import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { Session } from '@supabase/supabase-js';

interface AuthState {
  session: Session | null; // Tu żyje Access i Refresh token w RAMie
  user: unknown;
  isLoading: boolean;
}

const initialAuthState: AuthState = {
  session: null, // Tu żyje Access i Refresh token w RAMie
  user: null,
  isLoading: false,
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState<AuthState>(initialAuthState),
  withMethods((store) => ({
    setSession(newSession: Session | null) {
      patchState(store, { session: newSession, isLoading: false, user: newSession?.user ?? null });
    },
  })),
  withComputed((store) => ({
    currentSession: computed(() => {
      return store.session;
    }),
  })),
);
