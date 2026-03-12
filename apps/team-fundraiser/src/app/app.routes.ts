import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('@kitty-for-videos/campaigns-feature-dashboard').then(
        (m) => m.CampaignsFeatureDashboard,
      ),
  },
];
