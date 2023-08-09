import { CreateUser, UsersTable } from "../..";
import { RestApiResponse } from "./types";
export declare class AuthService {
    private usersTable;
    constructor(usersTable: UsersTable);
    signup(newUser: CreateUser): Promise<RestApiResponse>;
}
//# sourceMappingURL=AuthService.d.ts.map