import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';

import { CampaignsStore } from 'campaigns-data-access';
import { provideSupabaseConfig } from 'shared-util';
import { environment } from '../environments/environment';
import { AuthStore } from 'auth-data-access';

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
