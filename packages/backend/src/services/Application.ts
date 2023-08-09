import { UsersTable } from "..";
import { AuthTokenGenerator } from "./AuthTokenGenerator";
import { RestApiService } from "./rest_api";

export class Application {
    usersTable: UsersTable;
    restApiService: RestApiService;
    authTokenGenerator: AuthTokenGenerator;

    constructor(
        usersTable: UsersTable,
        authTokenGenerator: AuthTokenGenerator
    ) {
        this.usersTable = usersTable;
        this.authTokenGenerator = authTokenGenerator;
        this.restApiService = new RestApiService(
            this.usersTable,
            this.authTokenGenerator
        );
    }
}
