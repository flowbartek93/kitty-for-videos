import { patchState, signalStoreFeature, type, withMethods } from '@ngrx/signals';
import { NotificationsState } from './notifications.state';

export function withNotificationsMethods() {
  return signalStoreFeature(
    { state: type<NotificationsState>() },

    withMethods((store) => ({
      markAsRead(id: string) {
        patchState(store, {
          items: store.items().map((item) => (item.id === id ? { ...item, is_read: true } : item)),
        });
      },

      markAllAsRead() {
        patchState(store, {
          items: store.items().map((item) => ({ ...item, is_read: true })),
        });
      },
    })),
  );
}
