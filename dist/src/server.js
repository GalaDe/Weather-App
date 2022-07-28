"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const variables_1 = require("./utils/variables");
app_1.default.listen(variables_1.vars.PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${variables_1.vars.PORT}`);
});
//# sourceMappingURL=server.js.map