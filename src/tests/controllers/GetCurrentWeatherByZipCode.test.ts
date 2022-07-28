import { mocked } from 'ts-jest/utils';
import {GetCurrentWeatherByZipCode} from '../../controllers/GetCurrentWeatherByZipCode';
import { createCurrentWeatherByZipCodeHttpReq } from '../../helpers/request-builder';
import axios, { AxiosStatic } from 'axios';


interface AxiosMock extends AxiosStatic {
    mockResolvedValue: Function
  }


// Auto mock the modules
jest.mock('axios');
jest.mock('../../helpers/request-builder');


// Spy on axios
const mockAxios = axios as AxiosMock;
const consoleSpy = jest.spyOn(console, 'error').mockImplementation(console.log);

let fakeCurrentWeatherHttpReq = {
    url: 'http://fakeopenweatherapi.com',
    method: 'GET'
}

let fakeAxiosResponse = {
    status: 200,
    data:{
        main:{
            temp: 75,
            temp_max: 78,
            temp_min: 74,
        },
        weather:[
            {
                description: 'Sunny'
            }
        ],
        name: 'Seattle',
        country: 'USA',
        sys: { country: 'USA' }
    }
}

let fakeWeatherData = {
    weather: {
        currentTemp: 75,
        tempHigh: 78,
        tempLow: 74,
        currentWeather: 'Sunny'
    },
    location: { cityName: 'Seattle', country: 'USA', zipCode: '98275' }   
}

let fakeAxiosErrorResponse = {
    code: 404,
    response:{
        data: { message: 'Something went wrong' },
        status: 'Not Found'
    }
}




describe('Tests', () => {

    beforeEach(() => {
        consoleSpy.mockClear();
        jest.clearAllMocks();
    });

    afterAll((done) => {
        done();
    });

    it('Test GetCurrentWeatherByZipCode with valid data', async () => {
        // Arrange
        mocked(createCurrentWeatherByZipCodeHttpReq).mockReturnValue(Promise.resolve(fakeCurrentWeatherHttpReq));
        mockAxios.mockResolvedValue(Promise.resolve(fakeAxiosResponse));

        //Act
        let obj = new GetCurrentWeatherByZipCode();
        let response = await obj.getCurrentWeatherByZipCode('98275');

        //Assert
        expect(response).toStrictEqual(fakeWeatherData);
    })


    it('Test GetCurrentWeatherByZipCode throws error', async () => {
        // Arrange
        mocked(createCurrentWeatherByZipCodeHttpReq).mockReturnValue(Promise.resolve(fakeCurrentWeatherHttpReq));
        mockAxios.mockResolvedValue(Promise.reject(fakeAxiosErrorResponse));

        //Act
        let obj = new GetCurrentWeatherByZipCode();
        let response: any;

        try {
            response = await obj.getCurrentWeatherByZipCode('98275');
        } 
        catch (error) {
            expect(response).toBe(undefined);
        }
    })
})
