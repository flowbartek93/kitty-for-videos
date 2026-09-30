export type NotificationType = 'NEW_SUPPORTER' | 'CAMPAIGN_FINISHED' | 'NEW_CAMPAIGN' | 'CAMPAIGN_CLOSED';

export interface NotificationModel {
  id: string;
  user_id: string;
  target_id: string | null;
  type: NotificationType;
  content: string;
  is_read: boolean;
  created_at: string;
}
