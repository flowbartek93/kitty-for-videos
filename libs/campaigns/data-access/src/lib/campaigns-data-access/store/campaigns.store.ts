import { signalStore, withState } from '@ngrx/signals';
import { withCampaignsMethods } from './campaigns.methods';
import { campaignsState, initialCampaignsState } from './campaigns.state';

export const CampaignsStore = signalStore(
  { providedIn: 'root' },
  withState(initialCampaignsState),
  campaignsState,
  withCampaignsMethods(),
);
