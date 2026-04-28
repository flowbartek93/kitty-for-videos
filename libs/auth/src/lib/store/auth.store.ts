import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withHooks, withMethods, withProps, withState } from '@ngrx/signals';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { Session } from '@supabase/supabase-js';
import { PopupService, SupabaseClientService } from '@teamfund/shared';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, EMPTY, from, pipe, switchMap, tap } from 'rxjs';

interface AuthState {
  session: Session | null;
  user: unknown;
  isLoading: boolean;
  displayName: string | undefined;
}

const initialAuthState: AuthState = {
  session: null,
  user: null,
  isLoading: true,
  displayName: undefined,
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withProps(() => ({
    supabaseClient: inject(SupabaseClientService),
    popupSrv: inject(PopupService),
  })),
  withDevtools('auth'),
  withState<AuthState>(initialAuthState),
  withMethods((store) => ({
    setSession(newSession: Session | null) {
      patchState(store, { session: newSession, isLoading: false, user: newSession?.user ?? null });
    },

    setFullProfile: rxMethod<string>(
      pipe(
        switchMap((userId) => {
          return from(store.supabaseClient.client.from('profiles').select('*').eq('id', userId).single()).pipe(
            tap(({ data, error }) => {
              if (data) {
                patchState(store, { displayName: data.display_name ?? '' });
              }
            }),
            catchError((err: any) => {
              store.popupSrv.show('error during fetching profile');
              return EMPTY;
            }),
          );
        }),
      ),
    ),
  })),
  withComputed((store) => ({
    currentSession: computed(() => store.session()),
    loaded: computed(() => !store.isLoading()),
    currentUser: computed(() => store.displayName() ?? ''),
  })),
  withHooks((store) => {
    const supabase = inject(SupabaseClientService);
    return {
      onInit() {
        supabase.client.auth.onAuthStateChange((_event, session) => {
          if (session) {
            store.setSession(session);
            store.setFullProfile(session.user.id ?? '');
          }

          if (!session) {
            store.setSession(null);
          }
        });
      },
    };
  }),
);
