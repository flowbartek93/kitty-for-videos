import { Route } from '@angular/router';

export const CONTRIBUTIONS_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () => import('./my-contributions/my-contributions').then((m) => m.MyContributions),

    children: [
      { path: '', redirectTo: 'supported', pathMatch: 'full' },
      {
        path: 'my-initiatives',
        loadComponent: () => import('./my-initiatives/my-initiatives.component').then((m) => m.MyInitiativesComponent),
      },
    ],
  },
];
