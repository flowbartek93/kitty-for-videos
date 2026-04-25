import { Component, signal, output, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [], // Czysty komponent, nie potrzebuje wsparcia innych dywizji
  changeDetection: ChangeDetectionStrategy.OnPush, // Maksymalna wydajność
  templateUrl: './popup.component.html', // Tu podpinasz ten HTML, co Ci dałem wcześniej
})
export class ErrorPopupComponent {

  public readonly message = signal<string>('');

  public readonly close = output<void>();


  public dismiss(): void {
    this.close.emit();
  }
}
