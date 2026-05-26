import { Route } from '@angular/router';

export const CONTRIBUTIONS_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./main-contributions/main-contributions.component').then((m) => m.MainContributionsComponent),

    children: [
      { path: '', redirectTo: 'supported', pathMatch: 'full' },
      {
        path: 'my-initiatives',
        loadComponent: () => import('./my-initiatives/my-initiatives.component').then((m) => m.MyInitiativesComponent),
      },
      {
        path: 'supported',
        loadComponent: () =>
          import('./supported-initiatives/supported-initiatives').then((m) => m.SupportedInitiativesComponent),
      },
    ],
  },
];
