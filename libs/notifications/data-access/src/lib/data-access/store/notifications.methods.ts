import { signalStoreFeature, type, withMethods } from '@ngrx/signals';
import { NotificationsState } from './notifications.state';

export function withNotificationsMethods() {
  return signalStoreFeature(
    { state: type<NotificationsState>() },

    withMethods((store) => ({})),
  );
}
