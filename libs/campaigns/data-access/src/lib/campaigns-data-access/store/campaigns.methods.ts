import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStoreFeature,
  type,
  withMethods,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, tap, switchMap } from 'rxjs';
import { CampaignsState } from './campaigns.state';
import { withCampaignsProps } from './campaigns.props';
import { from } from 'rxjs';

export function withCampaignsMethods() {
  return signalStoreFeature(
    { state: type<CampaignsState>() },
    withCampaignsProps(),
    withMethods((store) => ({
      loadAllCampaigns: rxMethod<void>(
        pipe(
          // 1. Najpierw ustawiamy loading na true
          tap(() => patchState(store, { loading: true })),

          // 2. Strzał do API
          switchMap(() => from(store.supabaseSrv.getAllCampaings())),

          // 3. Obsługa wyniku - tapResponse musi być tutaj!
          tapResponse({
            next: (campaigns) => {
              // Aktualizujemy encje i wyłączamy loading
              // patchState(store, setAllEntities(campaigns), { loading: false });
            },
            error: (err) => {
              console.error('Błąd pobierania:', err);
              patchState(store, {
                loading: false,
                error: 'Nie udało się pobrać danych',
              });
            },
            finalize: () => console.log('Zakończono proces ładowania'),
          }),
        ),
      ),
    })),
  );
}
