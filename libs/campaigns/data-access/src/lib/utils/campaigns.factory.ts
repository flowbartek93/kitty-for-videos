import {
  Campaign,
  CampaignStatus,
  CreateCampaignPayload,
  CurrencyEnum,
  Participant,
  SupabaseParticipant,
  TierEnum,
} from '@teamfund/shared';

export interface SupabaseCampaignRecord {
  id: string;
  creator_id: string | null;
  user_id: string | null;
  title: string;
  description: string;
  video_url: string;
  total_cost_usd: number | null;
  currency: string | null;
  total_cost_pln: number | null;
  status: string | null;
  created_at: string | null;
  deadline?: string | null;
  preview_image_url?: string | null;
  tier: TierEnum;
}

export interface SupabaseCampaignInsert {
  title: string;
  description: string;
  video_url: string;
  total_cost_usd?: number;
  currency: string;
  total_cost_pln?: number;
  preview_title: string;
  preview_description: string;
  preview_image_url: string;
  creator_id?: string;
  user_id?: string;
  tier: TierEnum;
}

export interface SupabaseParticipantInsert {
  campaign_id: string;
}

export abstract class CampaignFactory {
  public static mapToCampaign(record: SupabaseCampaignRecord): Campaign {
    return {
      id: record.id,
      creatorId: record.creator_id ?? '',
      title: record.title,
      description: record.description,
      videoUrl: record.video_url,
      totalCostUSD: record.total_cost_usd ?? 0,
      currency: (record.currency as CurrencyEnum) ?? CurrencyEnum.PLN,
      totalCostPLN: record.total_cost_pln ?? undefined,
      status: (record.status as CampaignStatus) ?? 'active',
      createdAt: record.created_at ?? '',
      deadline: record.deadline ?? undefined,
      previewImageUrl: record.preview_image_url ?? undefined,
      tier: record.tier,
    };
  }

  public static mapToParticipant(record: SupabaseParticipant): Participant {
    return {
      id: record.id,
      campaignId: record.campaign_id,
      joinedAt: record.joined_at,
      paid: record.paid,
      userId: record.user_id,
    };
  }

  public static mapToCampaigns(records: SupabaseCampaignRecord[]): Campaign[] {
    return records.map(CampaignFactory.mapToCampaign);
  }

  public static mapToParticipants(records: SupabaseParticipant[]): Participant[] {
    return records.map(CampaignFactory.mapToParticipant);
  }

  public static createCampaignToSave(formData: CreateCampaignPayload): SupabaseCampaignInsert {
    return {
      title: formData.title,
      description: formData.description,
      video_url: formData.courseUrl,
      preview_title: formData.preview_title,
      preview_description: formData.preview_description,
      preview_image_url: formData.preview_image_url,
      total_cost_usd: formData.price,
      currency: formData.currency,
      // Dla PLN kwota przeliczona = cena bazowa. Dla walut obcych zostawiamy
      // puste — serwer (nest) przeliczy po aktualnym kursie.
      total_cost_pln: formData.currency === CurrencyEnum.PLN ? formData.price : undefined,
      tier: formData.priorityTier ?? TierEnum.tier1,
    };
  }
}
