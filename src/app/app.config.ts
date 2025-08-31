import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

declare module '@angular/core' {
  interface ApplicationConfig {
    apiEndpoint?: string;
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes)
  ],
  // apiEndpoint: 'https://api.example.com' 
};
