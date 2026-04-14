import { Route } from '@angular/router';
import { ShellComponent } from './shell/shell';
import { loginGuard } from 'auth-data-access';

export const appRoutes: Route[] = [
  {
    path: 'login',
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
