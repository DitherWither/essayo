"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const rest_api_1 = require("./rest_api");
class Application {
    usersTable;
    restApiService;
    authTokenGenerator;
    constructor(usersTable, authTokenGenerator) {
        this.usersTable = usersTable;
        this.authTokenGenerator = authTokenGenerator;
        this.restApiService = new rest_api_1.RestApiService(this.usersTable, this.authTokenGenerator);
    }
}
exports.Application = Application;
