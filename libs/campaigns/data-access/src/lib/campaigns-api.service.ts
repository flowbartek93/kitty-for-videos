import { inject, Injectable } from '@angular/core';
import { SupabaseClientService, Campaign, LinkPreview, CreateCampaignPayload } from '@teamfund/shared';
import { Observable, from, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CampaignsApiService {
  private supabase = inject(SupabaseClientService);

  getLinkIntel(targetUrl: string): Observable<LinkPreview> {
    return from(this.supabase.client.rpc('scrape_metadata', { target_url: targetUrl })).pipe(
      map(({ data, error }) => {
        if (error) throw new Error(error.message);
        return data as LinkPreview;
      }),
    );
  }

  createCampaign(payload: CreateCampaignPayload) {
    return from(
      this.supabase.client
        .from('campaigns')
        .insert({ ...payload })
        .select()
        .single(),
    );
  }
}
