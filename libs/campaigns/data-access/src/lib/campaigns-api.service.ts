import { inject, Injectable } from '@angular/core';
import { SupabaseClientService, Campaign } from '@teamfund/shared';
import { Observable, from, map } from 'rxjs';

export interface LinkPreview {
  title: string;
  description: string;
  image: string;
}

@Injectable({ providedIn: 'root' })
export class CampaignsApiService {
  private supabase = inject(SupabaseClientService);

  async getAllCampaigns(): Promise<Campaign[] | null> {
    const { data } = await this.supabase.client.from('campaigns').select('*');
    return data as Campaign[] | null;
  }

  getLinkIntel(targetUrl: string): Observable<LinkPreview> {
    return from(this.supabase.client.rpc('scrape_metadata', { target_url: targetUrl })).pipe(
      map(({ data, error }) => {
        if (error) throw new Error(error.message);
        return data as LinkPreview;
      }),
    );
  }
}
