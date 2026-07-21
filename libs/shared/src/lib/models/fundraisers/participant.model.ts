export interface Participant {
  id: string;
  campaignId: string;
  userId: string;
  joinedAt: Date;
  paid: boolean;
}

export interface SupabaseParticipant {
  id: string;
  campaign_id: string;
  user_id: string;
  paid: boolean;
  joined_at: Date;
}
