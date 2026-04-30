import { Injectable, inject } from '@angular/core';
import { AuthService } from 'auth';
import { CampaignsStore } from 'campaigns-data-access';

@Injectable({ providedIn: 'root' })
export class CampaignsService {
  readonly #store = inject(CampaignsStore);
}
