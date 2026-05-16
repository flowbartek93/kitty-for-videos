import { inject, Injectable } from '@angular/core';
import { SupabaseClientService } from '@teamfund/shared';
import { from } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserProfileDataService {
  private _supabase = inject(SupabaseClientService);

  saveProfile(userId: string, avatarUrl: string, secondName: string) {
    return from(
      this._supabase.client
        .from('profiles')
        .update({ avatar_url: avatarUrl, second_name: secondName })
        .eq('id', userId)
        .select()
        .single(),
    );
  }
}
