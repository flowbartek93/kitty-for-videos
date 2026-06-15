import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { signalStore, withState } from '@ngrx/signals';
import { withCampaignsMethods } from './campaigns.methods';
import { withCampaignsSelectors } from './campaigns.selectors';
import { CampaignsState, initialCampaignsState } from './campaigns.state';
import { withCampaignsProps } from './campaigns.props';

export const CampaignsStore = signalStore(
  { providedIn: 'root' },
  withDevtools('campaigns'),
  withState<CampaignsState>(initialCampaignsState),
  withCampaignsProps(),
  withCampaignsSelectors(),
  withCampaignsMethods(),
);
export type CampaignsStore = InstanceType<typeof CampaignsStore>;
