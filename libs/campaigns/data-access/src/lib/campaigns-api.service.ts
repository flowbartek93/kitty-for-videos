import { inject, Injectable } from '@angular/core';
import { Campaign, LinkPreview, Participant, SupabaseClientService, SupabaseParticipant } from '@teamfund/shared';
import { AuthStore } from 'auth';
import { from, map, Observable } from 'rxjs';
import { SupabaseCampaignInsert, SupabaseCampaignRecord, SupabaseParticipantInsert } from './utils/campaigns.factory';
import { PostgrestSingleResponse } from '@supabase/supabase-js';

@Injectable({ providedIn: 'root' })
export class CampaignsApiService {
  private supabase = inject(SupabaseClientService);
  private authStore = inject(AuthStore);

  public session = this.authStore.currentSession;

  getLinkIntel(targetUrl: string): Observable<LinkPreview> {
    return from(this.supabase.client.rpc('scrape_metadata', { target_url: targetUrl })).pipe(
      map(({ data, error }) => {
        if (error) throw new Error(error.message);
        return data as LinkPreview;
      }),
    );
  }

  createCampaign(payload: SupabaseCampaignInsert) {
    const currentUserId = this.session()?.user.id;

    return from(
      this.supabase.client
        .from('campaigns')
        .insert({ ...payload, creator_id: payload.creator_id ?? currentUserId })
        .select()
        .single<Campaign>(),
    );
  }

  createParticipant(selectedId: string) {
    const currentUserId = this.session()?.user.id;

    return from(
      this.supabase.client
        .from('participants')
        .insert({ campaign_id: selectedId, user_id: currentUserId })
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
    const currentUserId = this.session()?.user.id;

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

  getAllParticipants(): Observable<SupabaseParticipant[]> {
    return from(this.supabase.client.from('participants').select('*')).pipe(
      map(({ data, error }) => {
        if (error) throw new Error(error.message);
        return (data ?? []) as SupabaseParticipant[];
      }),
    );
  }
}
