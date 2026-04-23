import { ApplicationRef, ComponentRef, EnvironmentInjector, Injectable, createComponent, inject } from '@angular/core';
import { ErrorPopupComponent } from './popup.component';

@Injectable({ providedIn: 'root' })
export class PopupService {
  // readonly #store = inject(SignalStore);

  private readonly appRef = inject(ApplicationRef);
  private readonly envInjector = inject(EnvironmentInjector);

  private currentPopup: ComponentRef<ErrorPopupComponent> | null = null;

  show(msg: string) {
    if (this.currentPopup) {
      this.destroyPopup();
    }

    const popupRef = createComponent(ErrorPopupComponent, { environmentInjector: this.envInjector });

    popupRef.instance.message.set(msg);

    popupRef.instance.close.subscribe(() => {
      this.destroyPopup();
    });

    document.body.appendChild(popupRef.location.nativeElement);

    this.appRef.attachView(popupRef.hostView);
    this.currentPopup = popupRef;

    setTimeout(() => {
      this.destroyPopup();
    }, 5000);
  }

  destroyPopup() {
    if (this.currentPopup) {
      this.appRef.detachView(this.currentPopup.hostView);
      this.currentPopup.destroy();
      this.currentPopup = null;
    }
  }
}
