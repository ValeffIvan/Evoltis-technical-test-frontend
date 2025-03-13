import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { provideHttpClient } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { StoreModule, provideStore } from '@ngrx/store';
import { RegisterEffects } from './states/auth/effects/register.effects';
import { registerReducer } from './states/auth/reducers/register.reducer';
import { AuthEffects } from './states/auth/effects/auth.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore({
      register: registerReducer
    }),
    provideEffects([
      AuthEffects,
      RegisterEffects
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
