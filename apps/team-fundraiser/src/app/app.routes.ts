import { Route } from '@angular/router';
import { guestGuard, Login, loginGuard, Register } from 'auth';
import { ShellComponent } from './shell/shell';

export const appRoutes: Route[] = [
  {
    path: 'login',
    canActivate: [guestGuard],
    component: Login,
  },
  {
    path: 'register',
    canActivate: [],
    component: Register,
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
      {
        path: 'user-info',
        loadComponent: () => import('user-feature-profile').then((m) => m.UserInfoComponent),
      },
      {
        path: 'user-settings',
        loadChildren: () => import('user-feature-settings').then((m) => m.USER_ROUTES),
      },
    ],
  },
];
