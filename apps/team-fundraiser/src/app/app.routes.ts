import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full', // Obowiązkowe przy pustym path
    redirectTo: 'dashboard', // Przekierowanie do ścieżki obok
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('@kitty-for-videos/campaigns-feature-dashboard').then((m) => m.CampaignsFeatureDashboard),
  },
];
