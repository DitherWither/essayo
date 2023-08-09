import { AuthTokenGenerator, UsersTable } from "../..";
import { AuthService } from "./AuthService";

export class RestApiService {
    authService: AuthService;

    constructor(
        usersTable: UsersTable,
        authTokenGenerator: AuthTokenGenerator
    ) {
        this.authService = new AuthService(usersTable, authTokenGenerator);
    }
}
