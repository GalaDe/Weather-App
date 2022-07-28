# Weather-App

Current weather forecast using zip code

## Getting Started

First you need an API key from OpenWeatherMap, you can get one by creating an account on their website. After you got your API key, add it to src/utils/config.json file.

apiKey='YOUR API KEY'

Finally clone this repository, install dependencies and run the local server.

```
  git clone
  cd weatherapp
  npm install
  npm run build
  npm start
```

## How to test

1. Using Swagger: http://localhost:8080/swagger/weatherApp/
2. Using Postman:

```
  curl --location -g --request GET 'http://localhost:8080/api/currentWeather/{zipCode}'
```
