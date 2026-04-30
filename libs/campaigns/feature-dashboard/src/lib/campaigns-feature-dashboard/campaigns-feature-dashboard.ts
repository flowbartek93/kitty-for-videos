import { Component, inject } from '@angular/core';
import { AuthService } from 'auth';

@Component({
  selector: 'lib-campaigns-feature-dashboard',
  imports: [],
  templateUrl: './campaigns-feature-dashboard.html',
})
export class CampaignsFeatureDashboard {
  readonly authSrv = inject(AuthService);

  public username = this.authSrv.getCurrentUser();
}
