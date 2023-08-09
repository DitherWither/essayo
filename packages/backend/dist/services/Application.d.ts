import { UsersTable } from "..";
import { AuthTokenGenerator } from "./AuthTokenGenerator";
import { RestApiService } from "./rest_api";
export declare class Application {
    usersTable: UsersTable;
    restApiService: RestApiService;
    authTokenGenerator: AuthTokenGenerator;
    constructor(usersTable: UsersTable, authTokenGenerator: AuthTokenGenerator);
}
//# sourceMappingURL=Application.d.ts.map