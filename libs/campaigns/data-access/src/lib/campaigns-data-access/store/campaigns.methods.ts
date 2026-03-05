import { tapResponse } from '@ngrx/operators';
import { signalStoreFeature, withMethods } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, tap } from 'rxjs';
import { campaignsState } from './campaigns.state';

export function withCampaignsMethods() {
  return signalStoreFeature(
    campaignsState,
    withMethods((store) => ({
      loadAllCampaigns: rxMethod<void>(
        pipe(
          tap(() => {
            console.log('loading');

            tapResponse({
              next: () => {
                console.log('success');
              },
              error: () => {
                console.log('error');
              },
              finalize: () => console.log('finalize'),
            });
          }),
        ),
      ),
    })),
  );
}
