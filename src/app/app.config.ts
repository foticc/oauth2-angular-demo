import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {provideRouter, withHashLocation} from '@angular/router';

import { routes } from './app.routes';
import { provideOAuthClient } from 'angular-oauth2-oidc';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {reqLoggingInterceptor, resLoggingInterceptor} from "./guard/interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([reqLoggingInterceptor,resLoggingInterceptor])
    ),
    provideOAuthClient(),
  ],
};
