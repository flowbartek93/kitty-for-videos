import { NotificationModel } from '../../models/notifications.model';

const minutesAgo = (minutes: number) => new Date(Date.now() - minutes * 60_000).toISOString();

// TODO: usunąć po podpięciu prawdziwych powiadomień z Supabase
export const MOCK_NOTIFICATIONS: NotificationModel[] = [
  {
    id: 'mock-1',
    user_id: 'mock-user',
    target_id: 'mock-campaign-1',
    type: 'NEW_SUPPORTER',
    content: 'Anna Kowalska wsparła Twoją zbiórkę „Nowe stroje dla drużyny”',
    is_read: false,
    created_at: minutesAgo(3),
  },
  {
    id: 'mock-2',
    user_id: 'mock-user',
    target_id: 'mock-campaign-2',
    type: 'NEW_CAMPAIGN',
    content: 'Powstała nowa zbiórka „Wyjazd na turniej do Krakowa”',
    is_read: false,
    created_at: minutesAgo(42),
  },
  {
    id: 'mock-3',
    user_id: 'mock-user',
    target_id: 'mock-campaign-3',
    type: 'CAMPAIGN_FINISHED',
    content: 'Zbiórka „Piłki treningowe” osiągnęła cel 100%',
    is_read: false,
    created_at: minutesAgo(60 * 5),
  },
  {
    id: 'mock-4',
    user_id: 'mock-user',
    target_id: 'mock-campaign-4',
    type: 'CAMPAIGN_CLOSED',
    content: 'Zbiórka „Obóz letni 2026” została zamknięta',
    is_read: true,
    created_at: minutesAgo(60 * 26),
  },
  {
    id: 'mock-5',
    user_id: 'mock-user',
    target_id: 'mock-campaign-1',
    type: 'NEW_SUPPORTER',
    content: 'Marek Nowak wsparł Twoją zbiórkę „Nowe stroje dla drużyny”',
    is_read: true,
    created_at: minutesAgo(60 * 24 * 3),
  },
];
