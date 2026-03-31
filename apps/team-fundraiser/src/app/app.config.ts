import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';

import { CampaignsStore, provideSupabaseConfig } from 'libs/auth/data-access/src';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(appRoutes),
    CampaignsStore,
    provideSupabaseConfig({
      url: environment.supabaseUrl,
      key: environment.supabaseKey,
    }),
  ],
};
