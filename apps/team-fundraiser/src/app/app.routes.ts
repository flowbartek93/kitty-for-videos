import { Route } from '@angular/router';
import { loginGuard } from 'libs/auth/data-access/src';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full', // Obowiązkowe przy pustym path
    redirectTo: 'dashboard', // Przekierowanie do ścieżki obok
  },
  {
    path: 'dashboard',
    canActivate: [loginGuard],

    loadComponent: () =>
      import('@kitty-for-videos/campaigns-feature-dashboard').then((m) => m.CampaignsFeatureDashboard),
  },
];
