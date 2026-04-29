import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-stat-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stat-card.component.html',
})
export class StatCardComponent {
  /**
   * label: Tekst nad wartością (np. "Aktywne kampanie")
   * value: Główna liczba lub kwota do wyświetlenia
   */
  label = input.required<string>();
  value = input.required<string | number>();
}
