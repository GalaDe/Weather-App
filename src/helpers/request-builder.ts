import { vars } from '../utils/variables';
import { HttpRequest, HttpBaseRequest} from '../models/HttpRequest'



  export async function createCurrentWeatherByZipCodeHttpReq(zipCode: string):Promise<object> {
    const currentWeatherApi = vars.currentWeatherUrl(zipCode);
    const baseRequest: HttpBaseRequest = {
      url: currentWeatherApi,
      method: 'GET'
    };
    let request: HttpRequest = {
      ...baseRequest,
      headers: {
        'Accept': 'application/json'
      },
      data: {
      }
    }
    return request;
  }
 
