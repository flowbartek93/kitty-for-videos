import { inject, Injectable } from '@angular/core';
import { SupabaseClientService, Campaign } from '@teamfund/shared';

@Injectable({ providedIn: 'root' })
export class CampaignsApiService {
  private supabase = inject(SupabaseClientService);

  async getAllCampaigns(): Promise<Campaign[] | null> {
    const { data } = await this.supabase.client.from('campaigns').select('*');
    return data as Campaign[] | null;
  }
}
