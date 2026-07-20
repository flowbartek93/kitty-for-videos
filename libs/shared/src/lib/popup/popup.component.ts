import { ChangeDetectionStrategy, Component, computed, output, signal } from '@angular/core';

export type PopupType = 'error' | 'message';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './popup.component.html',
})
export class ErrorPopupComponent {
  public readonly message = signal<string>('');
  public readonly type = signal<PopupType>('error');

  public readonly title = computed(() => (this.type() === 'error' ? 'Blad' : 'Wiadomosc'));
  public readonly alertClass = computed(() =>
    this.type() === 'error' ? 'alert alert-error bg-error/80' : 'alert alert-info bg-info/80',
  );

  public readonly iconPath = computed(() =>
    this.type() === 'error'
      ? 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
      : 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  );

  public readonly close = output<void>();

  public dismiss(): void {
    this.close.emit();
  }
}
