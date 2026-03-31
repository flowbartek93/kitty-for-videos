import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CampaignsStore } from '@kitty-for-videos/campaigns-data-access';
import { SidebarComponent, TopBar } from '@kitty-for-videos/campaigns-ui';
@Component({
  imports: [RouterModule, SidebarComponent, TopBar],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  store = inject(CampaignsStore);
}
