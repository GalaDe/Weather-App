"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("ts-jest/utils");
const GetCurrentWeatherByZipCode_1 = require("../../controllers/GetCurrentWeatherByZipCode");
const request_builder_1 = require("../../helpers/request-builder");
const axios_1 = __importDefault(require("axios"));
// Auto mock the modules
jest.mock('axios');
jest.mock('../../helpers/request-builder');
// Spy on axios
const mockAxios = axios_1.default;
const consoleSpy = jest.spyOn(console, 'error').mockImplementation(console.log);
let fakeCurrentWeatherHttpReq = {
    url: 'http://fakeopenweatherapi.com',
    method: 'GET'
};
let fakeAxiosResponse = {
    status: 200,
    data: {
        main: {
            temp: 75,
            temp_max: 78,
            temp_min: 74,
        },
        weather: [
            {
                description: 'Sunny'
            }
        ],
        name: 'Seattle',
        country: 'USA',
        sys: { country: 'USA' }
    }
};
let fakeWeatherData = {
    weather: {
        currentTemp: 75,
        tempHigh: 78,
        tempLow: 74,
        currentWeather: 'Sunny'
    },
    location: { cityName: 'Seattle', country: 'USA', zipCode: '98275' }
};
let fakeAxiosErrorResponse = {
    code: 404,
    response: {
        data: { message: 'Something went wrong' },
        status: 'Not Found'
    }
};
describe('Tests', () => {
    beforeEach(() => {
        consoleSpy.mockClear();
        jest.clearAllMocks();
    });
    afterAll((done) => {
        done();
    });
    it('Test GetCurrentWeatherByZipCode with valid data', () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        (0, utils_1.mocked)(request_builder_1.createCurrentWeatherByZipCodeHttpReq).mockReturnValue(Promise.resolve(fakeCurrentWeatherHttpReq));
        mockAxios.mockResolvedValue(Promise.resolve(fakeAxiosResponse));
        //Act
        let obj = new GetCurrentWeatherByZipCode_1.GetCurrentWeatherByZipCode();
        let response = yield obj.getCurrentWeatherByZipCode('98275');
        //Assert
        expect(response).toStrictEqual(fakeWeatherData);
    }));
    it('Test GetCurrentWeatherByZipCode throws error', () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        (0, utils_1.mocked)(request_builder_1.createCurrentWeatherByZipCodeHttpReq).mockReturnValue(Promise.resolve(fakeCurrentWeatherHttpReq));
        mockAxios.mockResolvedValue(Promise.reject(fakeAxiosErrorResponse));
        //Act
        let obj = new GetCurrentWeatherByZipCode_1.GetCurrentWeatherByZipCode();
        let response;
        try {
            response = yield obj.getCurrentWeatherByZipCode('98275');
        }
        catch (error) {
            expect(response).toBe(undefined);
        }
    }));
});
//# sourceMappingURL=GetCurrentWeatherByZipCode.test.js.map