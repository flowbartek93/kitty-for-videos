import { signalStore, withState } from '@ngrx/signals';
import { campaignsState, initialCampaignsState } from './campaigns.state';

export const CampaignsStore = signalStore(
  { providedIn: 'root' },
  withState(initialCampaignsState),
  campaignsState,
);
