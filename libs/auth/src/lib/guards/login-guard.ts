import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';
import { AuthStore } from '../store/auth.store';

export const loginGuard: CanActivateFn = () => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  return toObservable(authStore.loaded).pipe(
    filter((loaded) => loaded),
    map(() => {
      if (!authStore.currentSession()) {
        return router.createUrlTree(['/login']);
      }
      return true;
    }),
  );
};

export const guestGuard: CanActivateFn = () => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  return toObservable(authStore.loaded).pipe(
    filter((loaded) => loaded),
    map(() => {
      if (authStore.currentSession()) {
        return router.createUrlTree(['/dashboard']);
      }
      return true;
    }),
  );
};
