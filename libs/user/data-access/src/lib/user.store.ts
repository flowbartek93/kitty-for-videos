import { computed, inject } from '@angular/core';
import { signalStore, withComputed, withMethods, withProps } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { PopupService, SupabaseClientService } from '@teamfund/shared';
import { AuthStore } from 'auth';
import { from, of, pipe, switchMap, tap } from 'rxjs';
import { UserProfileDataService } from './services/user-profile.service';
import { UpdateProfile } from './user-profile.model';

export const UserStore = signalStore(
  { providedIn: 'root' },
  withProps(() => ({
    _auth: inject(AuthStore),
    _supabase: inject(SupabaseClientService),
    _usersStoreSrv: inject(UserProfileDataService),
    _popupSrv: inject(PopupService),
  })),

  withComputed((store) => ({
    profile: computed(() => store._auth.currentProfile()),
    displayName: computed(() => store._auth.currentProfile()?.display_name ?? ''),
    secondName: computed(() => store._auth.currentProfile()?.second_name ?? ''),

    avatarUrl: computed(() => {
      const path = store._auth.currentProfile()?.avatar_url ?? null;
      if (!path) return 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hubert';

      const { data } = store._supabase.client.storage.from('avatars').getPublicUrl(path);
      return data.publicUrl;
    }),
    email: computed(() => store._auth.currentSession()?.user.email ?? ''),
    userId: computed(() => store._auth.currentSession()?.user.id ?? ''),
    fundsSummary: computed(() => store._auth.currentProfile()?.funds_summary ?? 0),
    campaignsCount: computed(() => store._auth.currentProfile()?.campaigns_count ?? 0),
    organisedCampaignsCount: computed(() => store._auth.currentProfile()?.organised_funds?.length ?? 0),
    activeFunds: computed(() => store._auth.currentProfile()?.active_funds ?? []),
    organizedFunds: computed(() => store._auth.currentProfile()?.organised_funds ?? []),
    isLoaded: computed(() => store._auth.loaded()),
    expenses: computed(() => store._auth.currentProfile()?.expenses_count ?? 0),
  })),

  withMethods((store) => ({
    updateProfile: rxMethod<UpdateProfile>(
      pipe(
        switchMap((data: UpdateProfile) => {
          const userId = store.profile()?.id;
          const rawAvatarPath = store.profile()?.avatar_url ?? '';

          if (!userId) return of(null);

          const storagePath = `${userId}/avatar`;

          const avatarPath$ = data.avatar
            ? from(
                store._supabase.client.storage.from('avatars').upload(storagePath, data.avatar, { upsert: true }),
              ).pipe(
                switchMap((res) => {
                  if (res.error) throw res.error;
                  return of(res.data.path);
                }),
              )
            : of(rawAvatarPath);

          return avatarPath$.pipe(
            switchMap((avatarPath) => store._usersStoreSrv.saveProfile(userId, avatarPath, data.callsign)),
            tap({
              next: () => {
                store._auth.setFullProfile(userId);
                store._popupSrv.show('profil zaktualizowany', 'message');
              },
              error: (err) => store._popupSrv.show(err.message),
            }),
          );
        }),
      ),
    ),
  })),
);
