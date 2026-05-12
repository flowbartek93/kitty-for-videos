import { computed, inject } from '@angular/core';
import { signalStore, withComputed, withProps } from '@ngrx/signals';
import { AuthStore } from 'auth';

export const UserStore = signalStore(
  { providedIn: 'root' },
  withProps(() => ({
    _auth: inject(AuthStore),
  })),
  withComputed(({ _auth }) => ({
    profile: computed(() => _auth.currentProfile()),
    displayName: computed(() => _auth.currentProfile()?.display_name ?? ''),
    secondName: computed(() => _auth.currentProfile()?.second_name ?? ''),
    avatarUrl: computed(() => _auth.currentProfile()?.avatar_url ?? null),
    email: computed(() => _auth.currentSession()?.user.email ?? ''),
    userId: computed(() => _auth.currentSession()?.user.id ?? ''),
    fundsSummary: computed(() => _auth.currentProfile()?.funds_summary ?? 0),
    campaignsCount: computed(() => _auth.currentProfile()?.campaigns_count ?? 0),
    organisedCampaignsCount: computed(() => _auth.currentProfile()?.organised_funds?.length ?? 0),
    isLoaded: computed(() => _auth.loaded()),
    expenses: computed(() => _auth.currentProfile()?.expenses_count ?? 0),
  })),
);
