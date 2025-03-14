import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { provideHttpClient } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { RegisterEffects } from './states/auth/effects/register.effects';
import { registerReducer } from './states/auth/reducers/register.reducer';
import { AuthEffects } from './states/auth/effects/auth.effects';
import { VideoGamesEffects } from './states/auth/effects/table.effects';
import { VideoGamesReducer } from './states/auth/reducers/table.reducer';
import { authReducer } from './states/auth/reducers/auth.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore({
      auth: authReducer,
      register: registerReducer,
      videogames: VideoGamesReducer
    }),
    provideEffects([
      AuthEffects,
      RegisterEffects,
      VideoGamesEffects
    ]),
    provideClientHydration(),
    provideHttpClient(),
    provideAnimationsAsync(),
    providePrimeNG({
        theme: {
            preset: Aura
        }
    })]
};
