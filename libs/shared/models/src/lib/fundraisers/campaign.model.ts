export type CampaignStatus = 'active' | 'funded' | 'completed' | 'canceled';

export interface Campaign {
  id: string;
  creatorId: string; // ID usera, który założył zrzutkę
  title: string;
  description: string;
  videoUrl: string; // Link do materiału (np. Vimeo, site instruktora)
  totalCostUSD: number; // Cena bazowa filmu
  status: CampaignStatus;
  createdAt: string;
  deadline?: string; // Opcjonalnie: do kiedy zbieramy
}

/** * Model rozszerzony, którego będziesz używał w widoku Dashboardu.
 * Te pola zostaną wyliczone przez Twój SignalStore.
 */
export interface CampaignWithStats extends Campaign {
  participantsCount: number;
  costPerPersonUSD: number;
  costPerPersonPLN: number;
}
