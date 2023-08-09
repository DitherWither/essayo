import { CreateUser, UsersTable, AuthTokenGenerator } from "../..";
import { RestApiResponse } from "./types";
export declare class AuthService {
    private usersTable;
    private authTokenGenerator;
    constructor(usersTable: UsersTable, authTokenGenerator: AuthTokenGenerator);
    signup(newUser: CreateUser): Promise<RestApiResponse>;
    login(loginUser: LoginUser): Promise<RestApiResponse>;
}
export interface LoginUser {
    email: string;
    password: string;
}
//# sourceMappingURL=AuthService.d.ts.map