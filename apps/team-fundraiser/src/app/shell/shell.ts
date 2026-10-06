import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { mapToProperCurrencies, NbpTable } from 'shared';
import { AuthService } from 'auth';
import { CampaignsStore } from 'campaigns-data-access';
import { SidebarComponent, TopBar } from 'layout-ui';
import { NotificationsStore } from 'notifications-data-access';
import { UserStore } from 'user-data-access';

@Component({
  imports: [RouterModule, SidebarComponent, TopBar],
  selector: 'app-shell',
  templateUrl: './shell.html',
})
export class ShellComponent {
  private authSrv = inject(AuthService);
  private router = inject(Router);
  private campaignsStore = inject(CampaignsStore);
  private httpClient = inject(HttpClient);
  readonly userStore = inject(UserStore);
  readonly notificationsStore = inject(NotificationsStore);

  constructor() {
    this.campaignsStore.loadAllCampaigns();
    this.campaignsStore.loadAllParticipants();

    this.httpClient.get<NbpTable[]>('http://localhost:3000/api/currencies').subscribe({
      next: (res: NbpTable[]) => {
        const response = res[0].rates;
        const currenciesModel = mapToProperCurrencies(response);

        this.campaignsStore.setCurrencies(currenciesModel);
      },
      error: (err) => console.error('NEST FAIL:', err),
    });
  }

  readonly avatarUrl = this.userStore.avatarUrl;
  public currentProfile = this.authSrv.getCurrentUser();

  async logout() {
    await this.authSrv.logout();
    this.router.navigate(['/login']);
  }
}
