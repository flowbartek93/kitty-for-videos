import { tapResponse } from '@ngrx/operators';
import { patchState, signalStoreFeature, type, withMethods } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, tap, switchMap } from 'rxjs';
import { from } from 'rxjs';
import { CampaignsState } from './campaigns.state';
import { withCampaignsProps } from './campaigns.props';
import { CreateCampaignPayload } from '@teamfund/shared';
import { CampaignFactory, SupabaseCampaignInsert } from '../utils/campaigns.factory';

export function withCampaignsMethods() {
  return signalStoreFeature(
    { state: type<CampaignsState>() },
    withCampaignsProps(),
    withMethods((store) => ({
      // loadAllCampaigns: rxMethod<void>(
      //   pipe(
      //     tap(() => patchState(store, { loading: true })),
      //     switchMap(() => from(store.campaignsApi.getAllCampaigns())),
      //     tapResponse({
      //       next: () => {
      //         // patchState(store, setAllEntities(campaigns ?? []), { loading: false });
      //         patchState(store, { loading: false });
      //       },
      //       error: (err) => {
      //         console.error('Błąd pobierania:', err);
      //         patchState(store, { loading: false, error: 'Nie udało się pobrać danych' });
      //       },
      //       finalize: () => console.log('Zakończono proces ładowania'),
      //     }),
      //   ),
      // ),

      createCampaign: rxMethod<CreateCampaignPayload>(
        pipe(
          switchMap((payload: CreateCampaignPayload) => {
            const campaignDto: SupabaseCampaignInsert = CampaignFactory.createCampaignToSave(payload);

            return store.campaignsApi.createCampaign(campaignDto);
          }),
          tapResponse({
            next: (res) => {
              // patchState(store, setAllEntities(campaigns ?? []), { loading: false });
              patchState(store, { loading: false });
            },
            error: (err) => {
              console.error('Błąd pobierania:', err);
              patchState(store, { loading: false, error: 'Nie udało się pobrać danych' });
            },
            finalize: () => console.log('Zakończono proces ładowania'),
          }),
        ),
      ),
    })),
  );
}
