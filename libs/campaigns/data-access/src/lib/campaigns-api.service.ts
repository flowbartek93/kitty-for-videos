import { inject, Injectable } from '@angular/core';
import { LinkPreview, SupabaseClientService } from '@teamfund/shared';
import { AuthStore } from 'auth';
import { from, map, Observable } from 'rxjs';
import { SupabaseCampaignInsert, SupabaseCampaignRecord } from './utils/campaigns.factory';

@Injectable({ providedIn: 'root' })
export class CampaignsApiService {
  private supabase = inject(SupabaseClientService);
  private authStore = inject(AuthStore);

  getLinkIntel(targetUrl: string): Observable<LinkPreview> {
    return from(this.supabase.client.rpc('scrape_metadata', { target_url: targetUrl })).pipe(
      map(({ data, error }) => {
        if (error) throw new Error(error.message);
        return data as LinkPreview;
      }),
    );
  }

  createCampaign(payload: SupabaseCampaignInsert) {
    const currentUserId = this.authStore.currentSession()?.user.id;

    return from(
      this.supabase.client
        .from('campaigns')
        .insert({ ...payload, creator_id: payload.creator_id ?? currentUserId })
        .select()
        .single(),
    );
  }

  getAllCampaigns(): Observable<SupabaseCampaignRecord[]> {
    return from(this.supabase.client.from('campaigns').select('*')).pipe(
      map(({ data, error }) => {
        if (error) throw new Error(error.message);
        return (data ?? []) as SupabaseCampaignRecord[];
      }),
    );
  }

  getUserCampaigns(): Observable<SupabaseCampaignRecord[]> {
    const currentUserId = this.authStore.currentSession()?.user.id;

    if (!currentUserId) {
      throw new Error('User session not found');
    }

    return from(
      this.supabase.client
        .from('campaigns')
        .select('*')
        .eq('creator_id', currentUserId)
        .order('created_at', { ascending: false }),
    ).pipe(
      map(({ data, error }) => {
        if (error) throw new Error(error.message);
        return (data ?? []) as SupabaseCampaignRecord[];
      }),
    );
  }
}
