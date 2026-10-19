import { Component, computed, input, output } from '@angular/core';

/** Minimalny kształt powiadomienia potrzebny do wyświetlenia (zgodny z NotificationModel). */
export interface BellNotification {
  id: string;
  type: string;
  content: string;
  is_read: boolean;
  created_at: string;
}

interface BellNotificationVariant {
  icon: string;
  tile: string;
}

const DEFAULT_VARIANT: BellNotificationVariant = {
  icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
  tile: 'bg-base-300 text-slate-400',
};

const VARIANTS: Record<string, BellNotificationVariant> = {
  NEW_SUPPORTER: {
    icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z',
    tile: 'bg-success/10 text-success',
  },
  CAMPAIGN_FINISHED: {
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    tile: 'bg-primary/10 text-primary',
  },
  NEW_CAMPAIGN: {
    icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
    tile: 'bg-info/10 text-info',
  },
  CAMPAIGN_CLOSED: {
    icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
    tile: 'bg-warning/10 text-warning',
  },
};

const relativeTime = new Intl.RelativeTimeFormat('pl', { numeric: 'auto' });

function timeAgo(isoDate: string): string {
  const diffSeconds = Math.round((new Date(isoDate).getTime() - Date.now()) / 1000);
  const abs = Math.abs(diffSeconds);
  if (abs < 60) return 'przed chwilą';
  if (abs < 3600) return relativeTime.format(Math.round(diffSeconds / 60), 'minute');
  if (abs < 86400) return relativeTime.format(Math.round(diffSeconds / 3600), 'hour');
  return relativeTime.format(Math.round(diffSeconds / 86400), 'day');
}

@Component({
  selector: 'lib-notification-bell',
  templateUrl: './notification-bell.html',
})
export class NotificationBell {
  /**
   * notifications: lista powiadomień wyświetlana w panelu po kliknięciu dzwonka
   * showIndicator: czy pokazywać kropkę/badge sugerujący nowe powiadomienia (domyślnie wyłączone)
   * count: liczba nieprzeczytanych; > 0 wyświetla liczbę w badge zamiast samej kropki
   * label: opis przycisku dla czytników ekranu
   * emptyText: tekst pokazywany, gdy brak powiadomień
   */
  readonly notifications = input<BellNotification[]>([]);
  readonly showIndicator = input<boolean>(false);
  readonly count = input<number>(0);
  readonly label = input<string>('Powiadomienia');
  readonly emptyText = input<string>('Nie masz jeszcze żadnych powiadomień');

  readonly bellClicked = output<void>();
  readonly notificationClicked = output<string>();
  readonly markAllReadClicked = output<void>();

  readonly badgeText = computed(() => {
    const count = this.count();
    if (count <= 0) return '';
    return count > 99 ? '99+' : String(count);
  });

  readonly items = computed(() =>
    this.notifications().map((notification) => ({
      ...notification,
      variant: VARIANTS[notification.type] ?? DEFAULT_VARIANT,
      timeAgo: timeAgo(notification.created_at),
    })),
  );

  readonly hasUnread = computed(() => this.notifications().some((n) => !n.is_read));
}
