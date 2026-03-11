import { signalStoreFeature, type } from '@ngrx/signals';
import { CampaignsState } from './campaigns.state';

export function withCapmaignsSelectors() {
  return signalStoreFeature({ state: type<CampaignsState>() });
}
