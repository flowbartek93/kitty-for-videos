import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './confirm-dialog.component.html',
})
export class ConfirmDialogComponent {
  readonly title = signal('Czy na pewno?');
  readonly message = signal('');
  readonly confirmLabel = signal('Potwierdź');
  readonly cancelLabel = signal('Anuluj');

  readonly confirmed = output<void>();
  readonly cancelled = output<void>();

  confirm(): void {
    this.confirmed.emit();
  }

  cancel(): void {
    this.cancelled.emit();
  }
}
