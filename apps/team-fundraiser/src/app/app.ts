import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CampaignsStore } from 'auth-data-access';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  store = inject(CampaignsStore);
}
