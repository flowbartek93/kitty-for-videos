import { computed, inject } from '@angular/core';
import { email } from '@angular/forms/signals';
import { signalStore, withComputed, withMethods, withProps } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { SupabaseClientService } from '@teamfund/shared';
import { AuthStore } from 'auth';
import { EMPTY, from, of, pipe, switchMap } from 'rxjs';
import { UpdateProfile } from 'user-data-access';

export const UserStore = signalStore(
  { providedIn: 'root' },
  withProps(() => ({
    _auth: inject(AuthStore),
    _supabase: inject(SupabaseClientService),
  })),
  withComputed(({ _auth, _supabase }) => ({
    profile: computed(() => _auth.currentProfile()),
    displayName: computed(() => _auth.currentProfile()?.display_name ?? ''),
    secondName: computed(() => _auth.currentProfile()?.second_name ?? ''),

    avatarUrl: computed(() => {
      const path = _auth.currentProfile()?.avatar_url ?? null;

      if (!path) return null;

      const { data } = _supabase.client.storage.from('avatars').getPublicUrl(path);

      return data.publicUrl;
    }),
    email: computed(() => _auth.currentSession()?.user.email ?? ''),
    userId: computed(() => _auth.currentSession()?.user.id ?? ''),
    fundsSummary: computed(() => _auth.currentProfile()?.funds_summary ?? 0),
    campaignsCount: computed(() => _auth.currentProfile()?.campaigns_count ?? 0),
    organisedCampaignsCount: computed(() => _auth.currentProfile()?.organised_funds?.length ?? 0),
    activeFunds: computed(() => _auth.currentProfile()?.active_funds ?? []),
    organizedFunds: computed(() => _auth.currentProfile()?.organised_funds ?? []),
    isLoaded: computed(() => _auth.loaded()),
    expenses: computed(() => _auth.currentProfile()?.expenses_count ?? 0),
  })),

  withMethods(({ _auth, _supabase }) => ({
    updateProfile: rxMethod<UpdateProfile>(
      pipe(
        switchMap((data: UpdateProfile) => {
          const userId = _auth.currentProfile()?.id;
          if (!userId) return of(null);

          const updateProfile = (callsign: string, avatarUrl?: string) =>
            _supabase.client
              .from('profiles')
              .update({
                second_name: callsign,
                avatar_url: avatarUrl,
              })
              .eq('id', userId);

          if (!data.avatar) {
            from(updateProfile(data.callsign));
          }

          if (data.avatar) {
            return from(_supabase.client.storage.from('avatars').update(userId, data.avatar)).pipe(
              switchMap((res) => {
                return from(updateProfile(data.callsign, res.data?.fullPath ?? ''));
              }),
            );
          }

          return EMPTY;
        }),
      ),
    ),
  })),
);
