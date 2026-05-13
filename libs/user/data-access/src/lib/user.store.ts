import { computed, inject } from '@angular/core';
import { signalStore, withComputed, withProps } from '@ngrx/signals';
import { SupabaseClientService } from '@teamfund/shared';
import { AuthStore } from 'auth';

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
);
