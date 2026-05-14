import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UpdateProfile, UserStore } from 'user-data-access';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './user-edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserEditComponent {
  private readonly fb = inject(FormBuilder);
  readonly store = inject(UserStore); // Podepnij swój Store

  // Signal na podgląd avatara (Base64 lub URL)
  avatarPreview = signal<string | null>(null);
  private selectedFile: File | null = null;

  // Formularz z walidacją defensywną
  readonly profileForm = this.fb.group({
    callsign: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    email: [{ value: '', disabled: true }], // Email zablokowany - Tier One Security
  });

  constructor() {
    effect(() => {
      this.profileForm.patchValue({
        callsign: this.store.secondName(),
        email: this.store.email(),
      });
    });
  }

  /**
   * Przechwycenie i weryfikacja przesyłki (pliku avatara)
   */
  handleAvatarChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];

    // DEFENSIVE CHECK: Typ MIME
    if (!file.type.startsWith('image/')) {
      alert('BREACH: Nieprawidłowy format pliku.');
      return;
    }

    this.selectedFile = file;

    // Generowanie podglądu (Instant Feedback)
    const reader = new FileReader();
    reader.onload = () => {
      this.avatarPreview.set(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  /**
   * Zatwierdzenie zmian i wysyłka na serwer
   */
  saveProfile(): void {
    if (this.profileForm.invalid) {
      console.error('SOP: Formularz zawiera błędy. Przerwij operację.');
      return;
    }

    const payload: UpdateProfile = {
      avatar: this.selectedFile ?? null,
      callsign: this.profileForm.get('callsign')?.value ?? '',
      email: this.profileForm.get('email')?.value ?? '',
    };

    console.log('COMMIT DATA:', payload);

    this.store.updateProfile(payload);
  }
}
