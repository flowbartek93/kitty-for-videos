import { Route } from '@angular/router';
import { ShellComponent } from './shell/shell';

export const appRoutes: Route[] = [
  {
    path: 'login',
    loadComponent: () => import('login').then((m) => m.Login),
  },
  {
    path: '',
    component: ShellComponent,
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
