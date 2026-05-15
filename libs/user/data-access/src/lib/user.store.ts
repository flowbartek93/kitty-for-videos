import { computed, inject } from '@angular/core';
import { signalStore, withComputed, withMethods, withProps } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { SupabaseClientService } from '@teamfund/shared';
import { AuthStore } from 'auth';
import { from, of, pipe, switchMap, tap } from 'rxjs';

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
    updateAvatar: rxMethod<File>(
      pipe(
        switchMap((file: File) => {
          const userId = _auth.currentProfile()?.id;
          if (!userId) return of(null);

          const storagePath = `${userId}/avatar`;

          return from(_supabase.client.storage.from('avatars').upload(storagePath, file, { upsert: true })).pipe(
            tap((res) => console.log('UPLOAD RESULT:', res)),
            switchMap((res) => {
              if (res.error) throw res.error;

              console.log('Updating profile avatar_url to:', res.data.path);
              return from(
                _supabase.client
                  .from('profiles')
                  .update({ avatar_url: res.data.path })
                  .eq('id', userId)
                  .select()
                  .single(),
              );
            }),
            tap({
              next: (res) => {
                console.log('PROFILE UPDATE RESULT:', res);
                _auth.setFullProfile(userId);
              },
              error: (err) => console.error('Upload avatar failed:', err),
            }),
          );
        }),
      ),
    ),
  })),
);
