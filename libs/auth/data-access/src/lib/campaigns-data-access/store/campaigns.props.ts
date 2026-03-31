import { inject } from '@angular/core';
import { SupabaseService } from '../services/supabase.service';
import { signalStoreFeature, withProps } from '@ngrx/signals';

export function withCampaignsProps() {
  return signalStoreFeature(
    withProps(() => {
      return {
        supabaseSrv: inject(SupabaseService),
      };
    }),
  );
}
