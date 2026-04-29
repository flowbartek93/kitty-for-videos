import { Route } from '@angular/router';

export const USER_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () => import('./user-settings.component').then((m) => m.UserSettingsComponent),

    children: [
      { path: '', redirectTo: 'security', pathMatch: 'full' },
      {
        path: 'security',
        loadComponent: () => import('./shared/user-opsec/user-opsec.component').then((m) => m.UserOpsecComponent),
      },
      {
        path: 'payments',
        loadComponent: () =>
          import('./shared/user-payments/user-payments.component').then((m) => m.UsersPaymentsComponent),
      },
      {
        path: 'notifications',
        loadComponent: () =>
          import('./shared/users-notifications/user-notifications.component').then((m) => m.UserNotificationsComponent),
      },
    ],
  },
];
