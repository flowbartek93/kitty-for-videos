import { patchState, signalStore, withComputed, withHooks, withProps, withState } from '@ngrx/signals';
import { NotificationsState, initialNotificationsState } from './notifications.state';
import { withNotificationsMethods } from './notifications.methods';
import { MOCK_NOTIFICATIONS } from './notifications.mock';
import { SupabaseClientService } from 'shared';
import { computed, inject } from '@angular/core';
import { AuthService } from 'auth';

export const NotificationsStore = signalStore(
  withState<NotificationsState>(initialNotificationsState),
  withProps(() => ({
    authSrv: inject(AuthService),
  })),
  withComputed((store) => ({
    unreadCount: computed(() => store.items().filter((item) => !item.is_read).length),
    hasUnread: computed(() => store.items().some((item) => !item.is_read)),
  })),
  withNotificationsMethods(),
  withHooks({
    onInit: (store) => {
      const supabaseSrv = inject(SupabaseClientService);

      // TODO: zastąpić pobieraniem z Supabase
      patchState(store, { items: MOCK_NOTIFICATIONS });

      supabaseSrv.client.auth.getSession().then(({ data }) => {
        const user = data.session?.user;
        if (!user) {
          console.warn('[notifications] brak sesji - nie subskrybuję');
          return;
        }

        console.log('[notifications] nasłuchuję jako', user.id, user.email);

        supabaseSrv.client
          .channel(`notifications:${user.id}`)
          .on(
            'postgres_changes',
            {
              event: 'INSERT',
              schema: 'public',
              table: 'notifications',
              filter: `user_id=eq.${user.id}`,
            },
            (payload) => console.log('[notifications] INSERT', payload.new),
          )
          .subscribe((status, error) => {
            console.log('[notifications] channel status:', status);
            if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
              console.error('[notifications] Realtime subscription failed', error);
            }
          });
      });
    },
  }),
);

export type NotificationsStore = InstanceType<typeof NotificationsStore>;
