import { TestBed } from '@angular/core/testing';
import { WeatherService } from './weather.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('WeatherService', () => {
  let service: WeatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService],
    });

    service = TestBed.inject(WeatherService);
  });

  it('should fetch weather data', async () => {
    const city = 'Paris';

    const geoData = [{ lat: 48.8566, lon: 2.3522, name: 'Paris' }];
    const currentWeather = {
      main: { temp: 25, humidity: 50 },
      weather: [{ description: 'Sunny', icon: '01d' }],
      wind: { speed: 5 },
      name: 'Paris',
    };
    const forecastData = { list: [] };

    const httpSpy = spyOn<any>(service['http'], 'get').and.callFake(
      (url: string) => {
        if (url.includes('/geo/1.0/direct')) return of(geoData);
        if (url.includes('/data/2.5/weather')) return of(currentWeather);
        if (url.includes('/data/2.5/forecast')) return of(forecastData);
        return of(null);
      }
    );

    const result = await service.getWeather(city);

    expect(result).toBeDefined();
    expect(result!.temp).toBe(25);
    expect(result!.description).toBe('Sunny');

    expect(httpSpy).toHaveBeenCalledTimes(3);
  });
});
