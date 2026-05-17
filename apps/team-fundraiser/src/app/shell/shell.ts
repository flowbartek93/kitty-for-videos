import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'auth';
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
  readonly userStore = inject(UserStore);

  readonly avatarUrl = this.userStore.avatarUrl;
  public currentProfile = this.authSrv.getCurrentUser();

  async logout() {
    await this.authSrv.logout();
    this.router.navigate(['/login']);
  }
}
