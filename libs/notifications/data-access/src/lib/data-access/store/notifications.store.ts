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
      const userId = store.authSrv.getCurrentUser();

      // TODO: zastąpić pobieraniem z Supabase
      patchState(store, { items: MOCK_NOTIFICATIONS });

      supabaseSrv.client
        .channel('db-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'campaigns',
          },
          (payload: Record<string, unknown>) => console.log(payload),
        )
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'participants',
          },
          (payload: Record<string, unknown>) => console.log(payload),
        )
        .subscribe();
      console.log('store works');
    },
  }),
);

export type NotificationsStore = InstanceType<typeof NotificationsStore>;
