import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import type {
  Coordinates,
  CurrentWeather,
  ForecastSummaryDay,
  TempUnit,
  WeatherState,
} from '../shared/models';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private base = environment.openWeather.baseUrl;
  private key = environment.openWeather.apiKey;

  state = signal<WeatherState>({
    unit: 'metric',
    city: 'Paris',
    loading: false,
  });

  constructor(private http: HttpClient) {}

  setUnit(unit: TempUnit) {
    this.state.update((s) => ({ ...s, unit }));
    const s = this.state();
    if (s.coords) this.loadByCoords(s.coords.lat, s.coords.lon);
  }

  setCity(city: string) {
    this.state.update((s) => ({ ...s, city }));
  }

  setCoords(coords: Coordinates) {
    this.state.update((s) => ({ ...s, coords }));
  }

  async searchCity(city: string) {
    this.setCity(city);
    this.state.update((s) => ({ ...s, loading: true, error: undefined }));
    try {
      const list = await firstValueFrom(
        this.http.get<any[]>(
          `${this.base}/geo/1.0/direct?q=${encodeURIComponent(
            city
          )}&limit=1&appid=${this.key}`
        )
      );
      if (!Array.isArray(list) || !list.length)
        throw new Error('City not found');

      const { lat, lon, name } = list[0];
      await this.loadByCoords(lat, lon, name);
    } catch (e: any) {
      this.state.update((s) => ({
        ...s,
        loading: false,
        error: e?.message ?? 'Search failed',
      }));
    }
  }

  async loadByCoords(lat: number, lon: number, labelName?: string) {
    this.state.update((s) => ({
      ...s,
      loading: true,
      error: undefined,
      coords: { lat, lon },
    }));
    try {
      const unit = this.state().unit;

      // Fetch current weather
      const cur = await firstValueFrom(
        this.http.get<any>(
          `${this.base}/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${this.key}`
        )
      );

      const current: CurrentWeather = {
        name: labelName ?? (cur.name || 'Unknown'),
        coords: { lat, lon },
        temp: cur.main?.temp,
        humidity: cur.main?.humidity,
        wind: cur.wind?.speed,
        description: cur.weather?.[0]?.description ?? '—',
        icon: cur.weather?.[0]?.icon ?? '01d',
      };

      // Fetch 3-day forecast
      const fj = await firstValueFrom(
        this.http.get<any>(
          `${this.base}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=${this.key}`
        )
      );

      const groups = new Map<
        string,
        { points: { time: number; temp: number }[] }
      >();
      const now = Date.now();

      for (const row of fj.list ?? []) {
        const tsMs = (row.dt as number) * 1000;
        if (tsMs < now) continue;
        const key = new Date(tsMs).toISOString().slice(0, 10);
        if (!groups.has(key)) groups.set(key, { points: [] });
        groups.get(key)!.points.push({ time: tsMs, temp: row.main?.temp });
      }

      const days: ForecastSummaryDay[] = Array.from(groups.entries())
        .slice(0, 3)
        .map(([date, { points }]) => ({
          date,
          min: Math.min(...points.map((p) => p.temp)),
          max: Math.max(...points.map((p) => p.temp)),
          points,
        }));

      this.state.update((s) => ({
        ...s,
        current,
        forecast3d: days,
        loading: false,
      }));
    } catch (e: any) {
      this.state.update((s) => ({
        ...s,
        loading: false,
        error: e?.message ?? 'Load failed',
      }));
    }
  }

  getWeather(city: string): Promise<CurrentWeather | undefined> {
    return new Promise((resolve, reject) => {
      this.searchCity(city)
        .then(() => resolve(this.state().current))
        .catch((error) => reject(error));
    });
  }
}
