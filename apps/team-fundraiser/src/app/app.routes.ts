import { Route } from '@angular/router';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { guestGuard, loginGuard } from 'auth-data-access';
import { ShellComponent } from './shell/shell';

export const appRoutes: Route[] = [
  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () => import('auth-data-access').then((m) => m.Login),
  },
  {
    path: '',
    component: ShellComponent,
    canActivate: [loginGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',

        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        loadComponent: () => import('campaigns-feature-dashboard').then((m) => m.CampaignsFeatureDashboard),
      },
    ],
  },
];
