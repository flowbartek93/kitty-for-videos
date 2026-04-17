import { signalStore, withHooks, withState } from '@ngrx/signals';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { withCampaignsMethods } from './campaigns.methods';
import { CampaignsState, initialCampaignsState } from './campaigns.state';
import { withCampaignsSelectors } from './campaigns.selectors';

export const CampaignsStore = signalStore(
  { providedIn: 'root' },
  withDevtools('campaigns'),
  withState<CampaignsState>(initialCampaignsState),
  withCampaignsMethods(),
  withCampaignsSelectors(),
  withHooks((store) => ({
    onInit: () => {
      store.loadAllCampaigns();
    },
  })),
);
