import { Routes } from '@angular/router';
import { WeatherDashboardComponent } from './dashboard/weather-dashboard/weather-dashboard.component';

export const routes: Routes = [
  { path: 'dashboard', component: WeatherDashboardComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' },
];
