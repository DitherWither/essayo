"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.backendResponseToExpressResponse = void 0;
function backendResponseToExpressResponse(express_response, response) {
    return express_response
        .status(response?.status ?? 500)
        .type("application/json")
        .send(response?.body);
}
exports.backendResponseToExpressResponse = backendResponseToExpressResponse;
