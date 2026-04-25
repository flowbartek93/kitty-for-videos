import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';

import { provideSupabaseConfig } from '@teamfund/shared';
import { AuthStore } from 'auth';
import { CampaignsStore } from 'campaigns-data-access';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(appRoutes),
    CampaignsStore,
    AuthStore,
    provideSupabaseConfig({
      url: environment.supabaseUrl,
      key: environment.supabaseKey,
    }),
  ],
};
