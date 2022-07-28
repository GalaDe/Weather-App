"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
const express_1 = __importDefault(require("express"));
const swaggerUI = __importStar(require("swagger-ui-express"));
const express_http_context_1 = __importDefault(require("express-http-context"));
const routes_1 = require("../generated/routes");
const variables_1 = require("./utils/variables");
const OPENAPI_URL = '/api/lp-partnersportal-app/openapi.json';
const app = (0, express_1.default)();
let genericKeys;
app.get('/', (req, res) => res.send('Server is up and running!'));
app.get(OPENAPI_URL, (req, res) => {
    res.sendFile(`${process.cwd()}/generated/swagger.json`);
});
app.use(express_1.default.urlencoded({
    extended: true,
}));
app.use(express_1.default.json());
app.use(express_http_context_1.default.middleware);
(0, routes_1.RegisterRoutes)(app);
try {
    const swaggerDoc = require(`${process.cwd()}/generated/swagger.json`);
    app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
}
catch (error) {
    console.error(error);
}
// Handling missing routes
app.use((_req, res) => {
    res.status(404).send({
        message: 'Not Found',
    });
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    genericKeys = yield variables_1.secrets.getSecretAsync(variables_1.vars.genericSecrets());
}))();
exports.default = app;
//# sourceMappingURL=app.js.map