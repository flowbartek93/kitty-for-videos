import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'auth';
import { CampaignsStore } from 'campaigns-data-access';
import { SidebarComponent, TopBar } from 'layout-ui';
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

  constructor() {
    this.campaignsStore.loadAllCampaigns();
    this.campaignsStore.loadAllParticipants();

    this.httpClient.get('http://localhost:3000/api/currencies').subscribe({
      next: (res) => console.log('NEST OK:', res),
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
