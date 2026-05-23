import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CreateCampaignPayload, LinkPreview } from '@teamfund/shared';
import { CampaignsApiService, CampaignsStore } from 'campaigns-data-access';
import { debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs';

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
    title: ['Example campaign title', [Validators.required, Validators.minLength(5)]],
    courseUrl: ['https://example.com/course', [Validators.required, Validators.pattern('^https:\\/\\/.*')]],
    price: [0, [Validators.required, Validators.min(15)]],
    minParticipants: [15, [Validators.required, Validators.min(15)]],
    priorityTier: ['TIER_1'],
    description: ['This is an example campaign description.', [Validators.required, Validators.minLength(20)]],
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
    const enrichedPayload: CreateCampaignPayload = {
      ...formValues,
      preview_title: currentPreview?.title || formValues.title,
      preview_description: currentPreview?.description || formValues.description,
      preview_image_url: currentPreview?.image || '',
    };

    this.store.createCampaign(enrichedPayload);
    this.router.navigate(['/dashboard']);
  }
}
