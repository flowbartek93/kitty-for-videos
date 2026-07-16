export interface Participant {
  id: string;
  campaignId: string;
  userId: string;
  joinedAt: Date;
  paid: boolean;
}
