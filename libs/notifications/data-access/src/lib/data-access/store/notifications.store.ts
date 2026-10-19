import { signalStore, withHooks, withProps, withState } from '@ngrx/signals';
import { NotificationsState, initialNotificationsState } from './notifications.state';
import { SupabaseClientService } from 'shared';
import { inject } from '@angular/core';
import { AuthService } from 'auth';

export const NotificationsStore = signalStore(
  { providedIn: 'root' },
  withState<NotificationsState>(initialNotificationsState),
  withProps(() => ({
    authSrv: inject(AuthService),
  })),
  withHooks({
    onInit: (store) => {
      const supabaseSrv = inject(SupabaseClientService);
      const userId = store.authSrv.getCurrentUser();

      void userId;

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
