import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import type { CurrentWeather } from '../../../shared/models';

@Component({
  selector: 'app-current-weather-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './current-weather-card.component.html',
  styleUrls: ['./current-weather-card.component.scss'],
})
export class CurrentWeatherCardComponent {
  @Input() current?: CurrentWeather | null;
  @Input() unit: 'metric' | 'imperial' = 'metric';

  get unitSymbol() {
    return this.unit === 'metric' ? '°C' : '°F';
  }
}
