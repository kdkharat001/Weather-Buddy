import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SearchFormComponent } from '../components/search-form/search-form.component';
import { WeatherService } from '../../services/weather.service';
import { CurrentWeatherCardComponent } from '../components/current-weather-card/current-weather-card.component';
import { ForecastChartComponent } from '../components/forecast-chart/forecast-chart.component';
import { MapPanelComponent } from '../components/map-panel/map-panel.component';
import { MatProgressBar } from '@angular/material/progress-bar';

@Component({
  selector: 'app-weather-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatGridListModule,
    MatSnackBarModule,
    SearchFormComponent,
    CurrentWeatherCardComponent,
    ForecastChartComponent,
    MapPanelComponent,
    MatProgressBar,
  ],
  templateUrl: './weather-dashboard.component.html',
  styleUrls: ['./weather-dashboard.component.scss'],
})
export class WeatherDashboardComponent {
  private ws = inject(WeatherService);
  private snack = inject(MatSnackBar);

  state = this.ws.state;

  constructor() {
    effect(() => {
      const err = this.ws.state().error;
      if (err) this.snack.open(err, 'Close', { duration: 3500 });
    });

    // initial load (city from state)
    setTimeout(() => this.ws.searchCity(this.ws.state().city || 'Paris'));
  }

  onCitySubmit(e: { city: string; unit: 'metric' | 'imperial' }) {
    if (e.unit !== this.ws.state().unit) this.ws.setUnit(e.unit);
    this.ws.searchCity(e.city);
  }

  onMapClick(coords: { lat: number; lon: number }) {
    this.ws.loadByCoords(coords.lat, coords.lon).then(() => {
      const city = this.ws.state().current?.name;
      if (city) {
        this.state.update((s) => ({ ...s, city }));
      }
    });
  }
}
