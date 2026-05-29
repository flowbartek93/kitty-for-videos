export type CampaignStatus = 'active' | 'finalized';

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
  previewImageUrl?: string;
  tier: TierEnum;
}

export enum TierEnum {
  tier1 = 'tier1',
  tier2 = 'tier2',
  tier3 = 'tier3',
}

/** * Model rozszerzony, którego będziesz używał w widoku Dashboardu.
 * Te pola zostaną wyliczone przez Twój SignalStore.
 */
export interface CampaignWithStats extends Campaign {
  participantsCount: number;
  costPerPersonUSD: number;
  costPerPersonPLN: number;
}

export interface LinkPreview {
  title: string;
  description: string;
  image: string;
}

export interface CreateCampaignPayload {
  title: string;
  courseUrl: string;
  minParticipants: number;
  price: number;
  priorityTier: TierEnum;
  description: string;
  preview_title: string;
  preview_description: string;
  preview_image_url: string;
}
