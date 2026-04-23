import { Component, signal, output, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [], // Czysty komponent, nie potrzebuje wsparcia innych dywizji
  changeDetection: ChangeDetectionStrategy.OnPush, // Maksymalna wydajność
  templateUrl: './popup.component.html', // Tu podpinasz ten HTML, co Ci dałem wcześniej
})
export class ErrorPopupComponent {
  /**
   * SIGNAL: Treść błędu.
   * Używamy zwykłego sygnału zamiast input(), żeby ToastService
   * mógł go łatwo ustawić po stworzeniu komponentu "z palca".
   */
  public readonly message = signal<string>(''); /**
   * OUTPUT: Sygnał do bazy o zakończeniu misji.
   * Wyzwalany przez kliknięcie 'X' lub timeout w serwisie.
   */
  public readonly close = output<void>();

  /**
   * TACTICAL EXIT: Wywoływane przez przycisk w HTML.
   */
  public dismiss(): void {
    this.close.emit();
  }
}
