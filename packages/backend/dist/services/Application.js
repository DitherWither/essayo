"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const rest_api_1 = require("./rest_api");
class Application {
    usersTable;
    restApiService;
    constructor(usersTable) {
        this.usersTable = usersTable;
        this.restApiService = new rest_api_1.RestApiService(this.usersTable);
    }
}
exports.Application = Application;
