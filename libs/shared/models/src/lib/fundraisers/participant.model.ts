export interface Participant {
  id: string;
  campaignId: string;
  userId: string;
  joinedAt: string;
  paid: boolean; // Czy user już przelał kasę do organizatora
}
