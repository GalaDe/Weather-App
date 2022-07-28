import config from './config.json';

export const vars = {
  PORT: 8080,
  OPENAPI_URL: '/api/weatherApp/openapi.json',

  currentWeatherUrl(zipCode: string): string {
    let url = config.currentWeatherByZipCode;
    url = url.replace('{zipCode}', zipCode);
    url = url.replace('{apiKey}', config.apiKey);
    return url;
  }
}