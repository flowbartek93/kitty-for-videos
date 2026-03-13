import { Component, input } from '@angular/core';

@Component({
  selector: 'lib-profile-card',
  imports: [],
  templateUrl: './profile-card.component.html',

})
export class ProfileCardComponent {
  // Nowoczesny Signal Input
  name = input.required<string>();
}
