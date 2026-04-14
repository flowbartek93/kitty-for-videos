import { signalStore, withHooks, withState } from '@ngrx/signals';
import { withCampaignsMethods } from './campaigns.methods';
import { CampaignsState, initialCampaignsState } from './campaigns.state';
import { withCampaignsSelectors } from './campaigns.selectors';

export const CampaignsStore = signalStore(
  { providedIn: 'root' },
  withState<CampaignsState>(initialCampaignsState),
  withCampaignsMethods(),
  withCampaignsSelectors(),
  withHooks((store) => ({
    onInit: () => {
      store.loadAllCampaigns();
    },
  })),
);
