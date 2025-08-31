import { Weather } from './models';

describe('WeatherModel', () => {
  it('should create a Weather instance', () => {
    const weather: Weather = {
      name: 'Test City',
      coords: { lat: 0, lon: 0 },
      temp: 25,
      humidity: 50,
      wind: 10,
      description: 'Clear sky',
      icon: '01d',
      temperature: 25,
      condition: 'Sunny',
    };
    expect(weather.temperature).toBe(25);
    expect(weather.condition).toBe('Sunny');
  });
});
