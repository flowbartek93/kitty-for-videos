import { CreateCampaignPayload } from '@teamfund/shared';

export interface SupabaseCampaignInsert {
  title: string;
  description: string;
  video_url: string;
  total_cost_usd?: number;
  status: string;
  preview_title: string;
  preview_description: string;
  preview_image_url: string;
  creator_id?: string;
  user_id?: string;
}

export abstract class CampaignFactory {
  createCampaignToSave(formData: CreateCampaignPayload): SupabaseCampaignInsert {
    return {
      title: formData.title,
      description: formData.description,
      video_url: formData.courseUrl,
      status: 'DRAFT',
      preview_title: formData.preview_title,
      preview_description: formData.preview_description,
      preview_image_url: formData.preview_image_url,
      total_cost_usd: formData.total,
    };
  }
}
