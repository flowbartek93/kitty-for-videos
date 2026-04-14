import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { from, map } from 'rxjs';

export const loginGuard: CanActivateFn = () => {
  const authSrv = inject(AuthService);
  const router = inject(Router);

  return from(authSrv.getSession()).pipe(
    map((session) => {
      if (!session) {
        return router.createUrlTree(['/login']);
      }
      return true;
    }),
  );
};
