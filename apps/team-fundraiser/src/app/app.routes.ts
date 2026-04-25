import { Route } from '@angular/router';
import { guestGuard, Login, loginGuard } from 'auth';
import { ShellComponent } from './shell/shell';

export const appRoutes: Route[] = [
  {
    path: 'login',
    canActivate: [guestGuard],
    component: Login,
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
