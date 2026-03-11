import { signalStore, withState } from '@ngrx/signals';
import { withCampaignsMethods } from './campaigns.methods';
import { CampaignsState, initialCampaignsState } from './campaigns.state';
import { withCapmaignsSelectors } from './campaigns.selectors';

export const CampaignsStore = signalStore(
  { providedIn: 'root' },
  withState<CampaignsState>(initialCampaignsState),
  withCampaignsMethods(),
  withCapmaignsSelectors(),
);
