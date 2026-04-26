import { Component, signal, output, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './popup.component.html',
})
export class ErrorPopupComponent {
  public readonly message = signal<string>('');

  public readonly close = output<void>();

  public dismiss(): void {
    this.close.emit();
  }
}
