import { RestApiResponse } from "backend/dist/services/rest_api/types";
import *  as express from "express"
export function backendResponseToExpressResponse(
    express_response: express.Response,
    response: RestApiResponse | undefined
): Express.Response {
    return express_response
        .status(response?.status ?? 500)
        .type("application/json")
        .send(response?.body);
}
