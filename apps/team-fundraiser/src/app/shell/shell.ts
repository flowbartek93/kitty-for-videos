import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SidebarComponent, TopBar } from 'campaigns-ui';
import { AuthService } from 'auth-data-access';

@Component({
  imports: [RouterModule, SidebarComponent, TopBar],
  selector: 'app-shell',
  templateUrl: './shell.html',
})
export class ShellComponent {
  private authSrv = inject(AuthService);
  private router = inject(Router);

  async logout() {
    await this.authSrv.logout();
    this.router.navigate(['/login']);
  }
}
