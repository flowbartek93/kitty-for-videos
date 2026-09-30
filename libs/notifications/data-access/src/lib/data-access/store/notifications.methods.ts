import { signalStoreFeature, type, withMethods, patchState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { pipe, switchMap, tap } from 'rxjs';
import { NotificationsState } from './notifications.state';

export function withNotificationsMethods() {
  return signalStoreFeature(
    { state: type<NotificationsState>() },

    withMethods((store) => ({})),
  );
}
