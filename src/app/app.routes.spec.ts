import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { routes } from './app.routes';

describe('AppRoutes', () => {
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
    });
    router = TestBed.inject(Router);
  });

  it('should contain a route for the dashboard', () => {
    const route = routes.find((r) => r.path === 'dashboard');
    expect(route).toBeTruthy();
    expect(route?.component).toBeDefined();
  });
});
