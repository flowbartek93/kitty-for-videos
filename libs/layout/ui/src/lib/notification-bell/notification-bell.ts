import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'lib-notification-bell',
  templateUrl: './notification-bell.html',
})
export class NotificationBell {
  /**
   * showIndicator: czy pokazywać kropkę/badge sugerujący nowe powiadomienia (domyślnie wyłączone)
   * count: liczba nieprzeczytanych; > 0 wyświetla liczbę w badge zamiast samej kropki
   * label: opis przycisku dla czytników ekranu
   */
  readonly showIndicator = input<boolean>(false);
  readonly count = input<number>(0);
  readonly label = input<string>('Powiadomienia');

  readonly bellClicked = output<void>();

  readonly badgeText = computed(() => {
    const count = this.count();
    if (count <= 0) return '';
    return count > 99 ? '99+' : String(count);
  });
}
