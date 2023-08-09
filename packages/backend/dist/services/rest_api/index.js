"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestApiService = void 0;
const AuthService_1 = require("./AuthService");
class RestApiService {
    authService;
    constructor(usersTable, authTokenGenerator) {
        this.authService = new AuthService_1.AuthService(usersTable, authTokenGenerator);
    }
}
exports.RestApiService = RestApiService;
