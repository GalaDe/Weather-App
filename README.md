# Weather-App

REST API to check the current weather forecast using zip code.

## Tech Stack

TypeScript, TSOA Routes, Swagger

## How to run locally

1. Clone this repository, install dependencies and run the local server.

    
```
  git clone
  cd weatherapp
  npm install
  npm run build
  npm start
```

2. Update API Key by creating an account on [OpenWeatherMap](https://openweathermap.org/)
3. Copy API Key from the [OpenWeatherMap](https://openweathermap.org/) website or your email, navigate to .vscode/launch.json, paste API Key into env
    
   Example: "WEATHER_API_KEY":"YOUR API KEY"


## How to test

1. Using Swagger: http://localhost:8080/swagger/weatherApp/
2. Using Postman:

```
  curl --location -g --request GET 'http://localhost:8080/api/currentWeather/{zipCode}'
```
