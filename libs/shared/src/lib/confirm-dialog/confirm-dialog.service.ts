import { ApplicationRef, ComponentRef, EnvironmentInjector, Injectable, createComponent, inject } from '@angular/core';
import { ConfirmDialogComponent } from './confirm-dialog.component';

export interface ConfirmDialogOptions {
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
}

@Injectable({ providedIn: 'root' })
export class ConfirmDialogService {
  private readonly appRef = inject(ApplicationRef);
  private readonly envInjector = inject(EnvironmentInjector);

  private currentDialog: ComponentRef<ConfirmDialogComponent> | null = null;

  confirm(options: ConfirmDialogOptions): Promise<boolean> {
    this.destroyDialog();

    return new Promise<boolean>((resolve) => {
      const dialogRef = createComponent(ConfirmDialogComponent, { environmentInjector: this.envInjector });

      dialogRef.instance.message.set(options.message);
      if (options.title) {
        dialogRef.instance.title.set(options.title);
      }
      if (options.confirmLabel) {
        dialogRef.instance.confirmLabel.set(options.confirmLabel);
      }
      if (options.cancelLabel) {
        dialogRef.instance.cancelLabel.set(options.cancelLabel);
      }

      const finish = (result: boolean) => {
        this.destroyDialog();
        resolve(result);
      };

      dialogRef.instance.confirmed.subscribe(() => finish(true));
      dialogRef.instance.cancelled.subscribe(() => finish(false));

      document.body.appendChild(dialogRef.location.nativeElement);
      this.appRef.attachView(dialogRef.hostView);
      this.currentDialog = dialogRef;
    });
  }

  private destroyDialog() {
    if (this.currentDialog) {
      this.appRef.detachView(this.currentDialog.hostView);
      this.currentDialog.destroy();
      this.currentDialog = null;
    }
  }
}
