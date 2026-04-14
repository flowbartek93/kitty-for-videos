import { inject } from '@angular/core';
import { CampaignsApiService } from '../campaigns-api.service';
import { signalStoreFeature, withProps } from '@ngrx/signals';

export function withCampaignsProps() {
  return signalStoreFeature(
    withProps(() => ({
      campaignsApi: inject(CampaignsApiService),
    })),
  );
}
