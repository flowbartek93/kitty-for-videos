import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from '../campaigns-data-access/services/supabase.service';
import { from } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

export const loginGuard: CanActivateFn = (route, state) => {
  const supabaseSrv = inject(SupabaseService);
  const router = inject(Router);
  const sessionsExists = toSignal(from(supabaseSrv.getSession()));

  if (!sessionsExists()) {
    return router.createUrlTree(['/login']);
  }

  return true;
};
