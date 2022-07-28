"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.GetCurrentWeatherByZipCode = void 0;
const tsoa_1 = require("tsoa");
const request_builder_1 = require("../helpers/request-builder");
const http_status_codes_1 = __importDefault(require("../utils/http-status-codes"));
const ErrorResponse_1 = require("../models/ErrorResponse");
const axios_1 = __importDefault(require("axios"));
let GetCurrentWeatherByZipCode = class GetCurrentWeatherByZipCode extends tsoa_1.Controller {
    getCurrentWeatherByZipCode(zipCode) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Start GET request for getCurrentWeatherByZipCode: ${zipCode}`);
            let response;
            console.log(`Create http request for getCurrentWeatherByZipCode: ${zipCode}`);
            let httpReq = yield (0, request_builder_1.createCurrentWeatherByZipCodeHttpReq)(zipCode);
            try {
                console.log(`Call getCurrentWeatherByZipCode API: ${zipCode}`);
                response = yield (0, axios_1.default)(httpReq);
                if (response.status == 200) {
                    console.log(`Request has been process successfully for getCurrentWeatherByZipCode: ${zipCode}`);
                    const mappedWeatherResponse = this.mapData(response, zipCode);
                    this.setStatus(http_status_codes_1.default.OK);
                    return mappedWeatherResponse;
                }
            }
            catch (error) {
                let errorResponse = (0, ErrorResponse_1.generateResponse)(error);
                console.error(`Request failed for getCurrentWeatherByZipCode: ${zipCode} with error status: ${errorResponse.status}: description: ${errorResponse.description}`);
                this.setStatus(errorResponse.status);
                return Promise.resolve(errorResponse);
            }
        });
    }
    mapData(response, zipCode) {
        let location = {
            cityName: response.data.name || '',
            country: response.data.sys.country || '',
            zipCode: zipCode
        };
        let weather = {
            currentTemp: response.data.main.temp || '',
            tempHigh: response.data.main.temp_max || '',
            tempLow: response.data.main.temp_min || '',
            currentWeather: response.data.weather[0].description || '',
        };
        let weatherResponse = {
            weather,
            location
        };
        return weatherResponse;
    }
};
__decorate([
    (0, tsoa_1.Get)(),
    (0, tsoa_1.Response)(400),
    (0, tsoa_1.Response)(404),
    (0, tsoa_1.Response)(500),
    __param(0, (0, tsoa_1.Path)())
], GetCurrentWeatherByZipCode.prototype, "getCurrentWeatherByZipCode", null);
GetCurrentWeatherByZipCode = __decorate([
    (0, tsoa_1.Route)('/api/currentWeather/:zipCode')
], GetCurrentWeatherByZipCode);
exports.GetCurrentWeatherByZipCode = GetCurrentWeatherByZipCode;
//# sourceMappingURL=GetCurrentWeatherByZipCode.js.map