import { tapResponse } from '@ngrx/operators';
import { patchState, signalStoreFeature, type, withMethods } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, tap, switchMap } from 'rxjs';
import { from } from 'rxjs';
import { CampaignsState } from './campaigns.state';
import { withCampaignsProps } from './campaigns.props';

export function withCampaignsMethods() {
  return signalStoreFeature(
    { state: type<CampaignsState>() },
    withCampaignsProps(),
    withMethods((store) => ({
      loadAllCampaigns: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap(() => from(store.campaignsApi.getAllCampaigns())),
          tapResponse({
            next: (campaigns) => {
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
