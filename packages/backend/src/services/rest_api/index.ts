import { UsersTable } from "../..";
import { AuthService } from "./AuthService";

export class RestApiService {
    authService: AuthService

    constructor(usersTable: UsersTable) {
        this.authService = new AuthService(usersTable);
    }
}
