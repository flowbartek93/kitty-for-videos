import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent, TopBar } from '@kitty-for-videos/campaigns-ui';
@Component({
  imports: [RouterModule, SidebarComponent, TopBar],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
