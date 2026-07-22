import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  convertToPln,
  CreateCampaignPayload,
  CURRENCY_OPTIONS,
  CurrencyEnum,
  LinkPreview,
  TierEnum,
} from '@teamfund/shared';
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

  protected readonly currencyOptions = CURRENCY_OPTIONS;
  protected readonly CurrencyEnum = CurrencyEnum;

  // Bezkompromisowa walidacja i brak wartości null
  protected createForm = this.fb.nonNullable.group({
    title: ['Example campaign title', [Validators.required, Validators.minLength(5)]],
    courseUrl: ['https://example.com/course', [Validators.required, Validators.pattern('^https:\\/\\/.*')]],
    price: [5, [Validators.required, Validators.min(5)]],
    currency: [CurrencyEnum.PLN, [Validators.required]],
    minParticipants: [15, [Validators.required, Validators.min(2)]],
    priorityTier: [TierEnum.tier1, [Validators.required]],
    description: ['This is an example campaign description.', [Validators.required, Validators.minLength(20)]],
  });

  // Podgląd wartości ceny i waluty (do przeliczenia PLN w UI)
  protected priceValue = toSignal(this.createForm.controls.price.valueChanges, {
    initialValue: this.createForm.controls.price.value,
  });
  protected currencyValue = toSignal(this.createForm.controls.currency.valueChanges, {
    initialValue: this.createForm.controls.currency.value,
  });
  protected minParticipantsValue = toSignal(this.createForm.controls.minParticipants.valueChanges, {
    initialValue: this.createForm.controls.minParticipants.value,
  });

  /** Czy wybrana waluta jest walutą obcą (inna niż PLN). */
  protected readonly isForeignCurrency = computed(() => this.currencyValue() !== CurrencyEnum.PLN);

  /**
   * Kwota przeliczona na PLN — liczona od razu wg (na razie fejkowych) kursów
   * ze store'u. To ta wartość trafia do API jako total_cost_pln.
   */
  protected readonly pricePLN = computed(() =>
    convertToPln(this.priceValue() ?? 0, this.currencyValue(), this.store.exchangeRates()),
  );

  /** Koszt przypadający na jednego uczestnika w PLN (przy minimalnym stanie osobowym). */
  protected readonly pricePerPersonPLN = computed(() => {
    const people = this.minParticipantsValue() ?? 0;
    if (people <= 0) {
      return null;
    }
    return Math.round((this.pricePLN() / people) * 100) / 100;
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
