import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CampaignsStore } from 'libs/auth/data-access/src';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  store = inject(CampaignsStore);
}
