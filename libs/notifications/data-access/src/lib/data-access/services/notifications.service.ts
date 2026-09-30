import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotificationsStore } from '../store/notifications.store';

@Injectable({
  providedIn: 'root',
})
export class NotificationsApiService {
  private readonly store = inject(NotificationsStore);

  }
}
