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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCurrentWeatherByZipCodeHttpReq = void 0;
const variables_1 = require("../utils/variables");
function createCurrentWeatherByZipCodeHttpReq(zipCode) {
    return __awaiter(this, void 0, void 0, function* () {
        const currentWeatherApi = variables_1.vars.currentWeatherUrl(zipCode);
        const baseRequest = {
            url: currentWeatherApi,
            method: 'GET'
        };
        let request = Object.assign(Object.assign({}, baseRequest), { headers: {
                'Accept': 'application/json'
            }, data: {} });
        return request;
    });
}
exports.createCurrentWeatherByZipCodeHttpReq = createCurrentWeatherByZipCodeHttpReq;
//# sourceMappingURL=request-builder.js.map