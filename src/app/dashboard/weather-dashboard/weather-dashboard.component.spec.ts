import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherDashboardComponent } from './weather-dashboard.component';
import { WeatherService } from '../../services/weather.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';


class MockWeatherService {
  state = () => ({ city: 'Paris', error: null, current: null, unit: 'metric' });
  searchCity = jasmine.createSpy('searchCity');
  setUnit = jasmine.createSpy('setUnit');
  loadByCoords = jasmine
    .createSpy('loadByCoords')
    .and.returnValue(Promise.resolve());
}

describe('WeatherDashboardComponent', () => {
  let component: WeatherDashboardComponent;
  let fixture: ComponentFixture<WeatherDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        WeatherDashboardComponent,
        MatSnackBarModule,
      ],
      providers: [{ provide: WeatherService, useClass: MockWeatherService }],
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call searchCity on onCitySubmit', () => {
    component.onCitySubmit({ city: 'London', unit: 'metric' });
    expect(component['ws'].searchCity).toHaveBeenCalledWith('London');
  });
});
