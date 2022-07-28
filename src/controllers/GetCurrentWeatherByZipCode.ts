import { Controller, Get, Route, Path, Response } from 'tsoa';
import { ErrorResponse } from '../models/ErrorResponse';
import { createCurrentWeatherByZipCodeHttpReq } from '../helpers/request-builder';
import { ForecastData } from '../models/ForecastData';
import { Location } from '../models/Location';
import HttpStatusCodes from '../utils/http-status-codes';
import { generateResponse } from '../models/ErrorResponse'
import axios from 'axios';



@Route('/api/currentWeather/:zipCode')
export class GetCurrentWeatherByZipCode extends Controller {
  @Get()
  @Response<ErrorResponse>(400)
  @Response<ErrorResponse>(404)
  @Response<ErrorResponse>(500)
  async getCurrentWeatherByZipCode(@Path() zipCode: string) {
    console.log(`Start GET request for getCurrentWeatherByZipCode: ${zipCode}`);
    let response: any;
    console.log(`Create http request for getCurrentWeatherByZipCode: ${zipCode}`);
    let httpReq = await createCurrentWeatherByZipCodeHttpReq(zipCode);
    try{
      console.log(`Call getCurrentWeatherByZipCode API: ${zipCode}`);
      response = await axios(httpReq);
      if(response.status == 200){
        console.log(`Request has been process successfully for getCurrentWeatherByZipCode: ${zipCode}`);
        const mappedWeatherResponse = this.mapData(response, zipCode);
        this.setStatus(HttpStatusCodes.OK);
        return mappedWeatherResponse;
      }
    }
    catch(error){
      let errorResponse = generateResponse(error); 
      console.error(`Request failed for getCurrentWeatherByZipCode: ${zipCode} with error status: ${errorResponse.status}: description: ${errorResponse.description}`);
      this.setStatus(errorResponse.status);
      return Promise.resolve(errorResponse);
    }
  }

  mapData(response: any, zipCode: string){
    let location: Location = {
      cityName: response.data.name || '',
      country: response.data.sys.country || '',
      zipCode: zipCode
    }
    let weather: ForecastData = {
      currentTemp: response.data.main.temp || '',
      tempHigh: response.data.main.temp_max || '',
      tempLow: response.data.main.temp_min || '',
      currentWeather: response.data.weather[0].description || '',
    }
    let weatherResponse = {
      weather,
      location
    }
    return weatherResponse;
  }
}

