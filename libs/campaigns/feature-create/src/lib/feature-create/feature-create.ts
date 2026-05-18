import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CampaignsStore } from 'campaigns-data-access';

@Component({
  selector: 'lib-campaign-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './feature-create.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CampaignCreateComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  store = inject(CampaignsStore);

  // Bezkompromisowa walidacja i brak wartości null
  protected createForm = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(5)]],
    courseUrl: ['', [Validators.required, Validators.pattern('^https:\\/\\/.*')]],
    targetAmount: [0, [Validators.required, Validators.min(100)]],
    minParticipants: [15, [Validators.required, Validators.min(15)]],
    priorityTier: ['TIER_1'],
    description: ['', [Validators.required, Validators.minLength(20)]],
  });

  protected isFieldInvalid(fieldName: string): boolean {
    const control = this.createForm.get(fieldName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  protected executeLaunch(): void {
    if (this.createForm.invalid) {
      this.createForm.markAllAsTouched();
      return;
    }

    const payload = this.createForm.getRawValue();
    console.log('Deploying payload to database:', payload);

    // store.createNewCampaign(payload);
    this.router.navigate(['/campaigns']);
  }
}
