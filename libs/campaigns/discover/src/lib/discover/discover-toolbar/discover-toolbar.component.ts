import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { CampaignsStore, FilterOption } from 'campaigns-data-access';

@Component({
  selector: 'lib-discover-toolbar',
  imports: [],
  templateUrl: './discover-toolbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiscoverToolbarComponent {
  public store = inject(CampaignsStore);

  currentSelectedFilter = this.store.discoverFilterOption;

  private readonly base = 'cursor-pointer px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all';
  private readonly active = `${this.base} bg-indigo-600 text-white`;
  private readonly inactive = `${this.base} bg-zinc-900 border border-zinc-800 text-zinc-400 hover:border-zinc-600`;

  btnClass(tier: FilterOption): string {
    return this.currentSelectedFilter() === tier ? this.active : this.inactive;
  }

  handleTierChange(choice: FilterOption) {
    this.store.setDiscoverFilter(choice);
  }
}
