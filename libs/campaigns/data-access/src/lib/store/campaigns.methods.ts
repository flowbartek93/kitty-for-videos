import { tapResponse } from '@ngrx/operators';
import { patchState, signalStoreFeature, type, withMethods } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { CreateCampaignPayload, FilterOption, Participant, SupabaseParticipant } from '@teamfund/shared';
import { EMPTY, pipe, switchMap, tap } from 'rxjs';
import { CampaignFactory, SupabaseCampaignInsert } from '../utils/campaigns.factory';
import { withCampaignsProps } from './campaigns.props';
import { CampaignsState } from './campaigns.state';
import { withCampaignsSelectors } from './campaigns.selectors';
import { PostgrestSingleResponse } from '@supabase/supabase-js';

export function withCampaignsMethods() {
  return signalStoreFeature(
    { state: type<CampaignsState>() },

    withCampaignsProps(),

    withMethods((store) => ({
      loadAllCampaigns: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { loading: true, error: null })),
          switchMap(() => store.campaignsApi.getAllCampaigns()),
          tapResponse({
            next: (records) => {
              patchState(store, { allCampaigns: CampaignFactory.mapToCampaigns(records), loading: false });
            },
            error: (err) => {
              console.error('Błąd pobierania:', err);
              patchState(store, { loading: false, error: 'Nie udało się pobrać danych' });
            },
          }),
        ),
      ),

      loadAllParticipants: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { loading: true, error: null })),
          switchMap(() => store.campaignsApi.getAllParticipants()),
          tapResponse({
            next: (records) => {
              patchState(store, { allParticipants: CampaignFactory.mapToParticipants(records), loading: false });
            },
            error: (err) => {
              console.error('Błąd pobierania:', err);
              patchState(store, { loading: false, error: 'Nie udało się pobrać danych' });
            },
          }),
        ),
      ),

      loadUserCampaigns: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { loading: true, error: null })),
          switchMap(() => store.campaignsApi.getUserCampaigns()),
          tapResponse({
            next: (records) => {
              patchState(store, { userCampaigns: CampaignFactory.mapToCampaigns(records), loading: false });
            },
            error: (err) => {
              console.error('Błąd pobierania:', err);
              patchState(store, { loading: false, error: 'Nie udało się pobrać danych' });
            },
          }),
        ),
      ),

      createCampaign: rxMethod<CreateCampaignPayload>(
        pipe(
          tap(() => patchState(store, { loading: true, error: null })),
          switchMap((payload: CreateCampaignPayload) => {
            const campaignDto: SupabaseCampaignInsert = CampaignFactory.createCampaignToSave(payload);

            return store.campaignsApi.createCampaign(campaignDto);
          }),
          tapResponse({
            next: () => {
              patchState(store, { loading: false });
            },
            error: (err) => {
              console.error('Błąd pobierania:', err);
              patchState(store, { loading: false, error: 'Nie udało się pobrać danych' });
            },
          }),
        ),
      ),

      supportCampaign: rxMethod<string>(
        pipe(
          tap(() => patchState(store, { loading: true, error: null })),
          switchMap((id: string) => {
            return store.campaignsApi.createParticipant(id);
          }),
          tapResponse({
            next: (res: PostgrestSingleResponse<SupabaseParticipant>) => {
              if (res.data) {
                const existing = store.allParticipants() ?? [];
                const participant: Participant = CampaignFactory.mapToParticipant(res.data);

                patchState(store, { allParticipants: [...existing, participant], loading: false });
              }
              return EMPTY;
            },
            error: (err) => {
              patchState(store, { loading: false, error: 'Nie udało się dodać uczestnika' });
            },
          }),
        ),
      ),
    })),

    withMethods((store) => ({
      setDiscoverFilter: (filter: FilterOption) => {
        patchState(store, { discoverFilterOption: filter });
      },
    })),
  );
}
