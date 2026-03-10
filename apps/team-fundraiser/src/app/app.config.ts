import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';

import { provideSupabaseConfig } from '@kitty-for-videos/campaigns-data-access';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(appRoutes),
    provideSupabaseConfig({
      url: environment.supabaseUrl,
      key: environment.supabaseKey,
    }),
  ],
};
