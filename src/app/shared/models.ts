export type TempUnit = 'metric' | 'imperial';

export interface Coordinates {
  lat: number;
  lon: number;
}

export interface CurrentWeather {
  name: string;
  coords: Coordinates;
  temp: number;
  humidity: number;
  wind: number;
  description: string;
  icon: string;
}

export interface ForecastPoint {
  time: number;
  temp: number;
}

export interface ForecastSummaryDay {
  date: string;
  min: number;
  max: number;
  points: ForecastPoint[];
}

export interface Weather {
  name: string;
  coords: Coordinates;
  temp: number;
  humidity: number;
  wind: number;
  description: string;
  icon: string;
  temperature?: number; 
  condition?: string; 
}

export interface WeatherState {
  unit: TempUnit;
  city: string;
  coords?: Coordinates;
  current?: CurrentWeather;
  forecast3d?: ForecastSummaryDay[];
  loading: boolean;
  error?: string;
}
