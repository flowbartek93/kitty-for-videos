import { Component, inject, ChangeDetectionStrategy, signal, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CampaignsApiService, CampaignsStore } from 'campaigns-data-access';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, tap, filter, switchMap, EMPTY } from 'rxjs';

interface LinkPreview {
  title: string;
  description: string;
  image: string;
}

@Component({
  selector: 'lib-campaign-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './feature-create.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CampaignCreateComponent {
  private fb = inject(FormBuilder);
  private apiService = inject(CampaignsApiService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  store = inject(CampaignsStore);

  protected linkPreview = signal<LinkPreview | null>(null);
  protected isScraping = signal<boolean>(false);

  // Bezkompromisowa walidacja i brak wartości null
  protected createForm = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(5)]],
    courseUrl: ['', [Validators.required, Validators.pattern('^https:\\/\\/.*')]],
    targetAmount: [0, [Validators.required, Validators.min(100)]],
    minParticipants: [15, [Validators.required, Validators.min(15)]],
    priorityTier: ['TIER_1'],
    description: ['', [Validators.required, Validators.minLength(20)]],
  });

  constructor() {
    this.setupLinkScraperPipeline();
  }

  private setupLinkScraperPipeline(): void {
    this.createForm.controls.courseUrl.valueChanges
      .pipe(
        debounceTime(700),
        distinctUntilChanged(),
        tap(() => this.linkPreview.set(null)),
        filter((url) => this.createForm.controls.courseUrl.valid && !!url),
        tap(() => this.isScraping.set(true)),
        switchMap((url) =>
          this.apiService.getLinkIntel(url).pipe(
            tap({
              next: (intel) => {
                this.linkPreview.set(intel);
                this.isScraping.set(false);
              },
              error: () => this.isScraping.set(false),
            }),
          ),
        ),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  protected isFieldInvalid(fieldName: string): boolean {
    const control = this.createForm.get(fieldName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  protected executeLaunch(): void {
    if (this.createForm.invalid) {
      this.createForm.markAllAsTouched();
      return;
    }

    const formValues = this.createForm.getRawValue();
    const currentPreview = this.linkPreview();

    // Łączenie danych formularza z wywiadem Open Graph (Zapis w bazie)
    const enrichedPayload = {
      ...formValues,
      preview_title: currentPreview?.title || formValues.title,
      preview_description: currentPreview?.description || formValues.description,
      preview_image_url: currentPreview?.image || '',
    };

    // this.store.createCampaign(enrichedPayload);
    this.router.navigate(['/campaigns']);
  }
}
