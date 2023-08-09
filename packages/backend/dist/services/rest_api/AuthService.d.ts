import { CreateUser, UsersTable, AuthTokenGenerator } from "../..";
import { RestApiResponse } from "./types";
export declare class AuthService {
    private usersTable;
    private authTokenGenerator;
    constructor(usersTable: UsersTable, authTokenGenerator: AuthTokenGenerator);
    signup(newUser: CreateUser): Promise<RestApiResponse>;
}
//# sourceMappingURL=AuthService.d.ts.map