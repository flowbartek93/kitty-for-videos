import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterLinkWithHref, RouterModule } from '@angular/router';

@Component({
  selector: 'lib-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLinkActive, RouterLink],
  templateUrl: './sidebar.html',
})
export class SidebarComponent {
  menuItems = [
    { label: 'Dashboard', icon: 'grid_view', path: '/' },
    { label: 'Odkrywaj', icon: 'explore', path: '/explore' },
    { label: 'Moje Udziały', icon: 'account_balance_wallet', path: '/pledges' },
    { label: 'Ustawienia', icon: 'settings', path: '/settings' },
  ];
}
