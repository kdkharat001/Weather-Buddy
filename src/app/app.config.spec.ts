import { appConfig } from './app.config';

describe('AppConfig', () => {
  it('should have a valid API endpoint', () => {
    expect(appConfig.apiEndpoint).toBeDefined();
    expect(appConfig.apiEndpoint).toContain('http');
  });
});
