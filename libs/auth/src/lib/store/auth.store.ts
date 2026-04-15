import { signalStore, withHooks, withState } from '@ngrx/signals';
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

export const AuthStore = signalStore({ providedIn: 'root' }, withState<AuthState>(initialAuthState));
