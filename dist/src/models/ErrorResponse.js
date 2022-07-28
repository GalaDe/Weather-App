"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateResponse = void 0;
function generateResponse(error) {
    const errorResponse = {
        code: error.code,
        description: error.response.data.message,
        status: error.response.status,
    };
    return errorResponse;
}
exports.generateResponse = generateResponse;
//# sourceMappingURL=ErrorResponse.js.map