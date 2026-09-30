import { NotificationModel } from '../../..';

export interface NotificationsState {
  loading: boolean;
  error: string | null;
  items: NotificationModel[];
  // tutaj dodaj kolejne właściwości stanu
}

export const initialNotificationsState: NotificationsState = {
  loading: false,
  error: null,
  items: [],
  // tutaj dodaj wartości początkowe
};
