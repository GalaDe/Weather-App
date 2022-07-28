"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vars = void 0;
const config_json_1 = __importDefault(require("./config.json"));
exports.vars = {
    PORT: 8080,
    OPENAPI_URL: '/api/weatherApp/openapi.json',
    currentWeatherUrl(zipCode) {
        let url = config_json_1.default.currentWeatherByZipCode;
        url = url.replace('{zipCode}', zipCode);
        url = url.replace('{apiKey}', `${process.env.WEATHER_API_KEY}`);
        return url;
    }
};
//# sourceMappingURL=variables.js.map