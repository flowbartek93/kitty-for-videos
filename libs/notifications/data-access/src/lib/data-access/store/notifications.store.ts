import { signalStore, withHooks, withState } from '@ngrx/signals';
import { NotificationsState, initialNotificationsState } from './notifications.state';

export const NotificationsStore = signalStore(
  { providedIn: 'root' },
  withState<NotificationsState>(initialNotificationsState),
  withHooks({
    onInit: () => {
      console.log('store works');
    },
  }),
);

export type NotificationsStore = InstanceType<typeof NotificationsStore>;
