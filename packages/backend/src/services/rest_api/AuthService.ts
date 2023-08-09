import { UserCreateError, CreateUser, UsersTable, removePassword } from "../..";
import { RestApiResponse } from "./types";

export class AuthService {
    private usersTable: UsersTable;

    constructor(usersTable: UsersTable) {
        this.usersTable = usersTable;
    }

    async signup(newUser: CreateUser): Promise<RestApiResponse> {
        const { user, error } = await this.usersTable.createNew(newUser);
        if (error != null) {
            return userCreateErrorToResponse(error);
        }
        if (user != null) {
            // TODO: return jwt
            return {
                status: 200,
                body: JSON.stringify({
                    user: removePassword(user),
                }),
            };
        }

        return {
            status: 500,
            body: JSON.stringify({
                error: "UnknownError",
                error_message:
                    "An unknown error occurred, please try again, and report this bug if it persists",
            }),
        };
    }
}

function userCreateErrorToResponse(error: UserCreateError): RestApiResponse {
    switch (error) {
        case UserCreateError.DatabaseAccessError:
            return {
                status: 500,
                body: JSON.stringify({
                    error: "DatabaseAccessError",
                    error_message:
                        "An error occurred while reading the database, please try again, and report this bug if it persists",
                }),
            };
        case UserCreateError.EmailAlreadyExists:
            return {
                status: 400,
                body: JSON.stringify({
                    error: "EmailAlreadyExists",
                    error_message:
                        "The email entered already exists, please try logging in instead",
                }),
            };
        default:
            return {
                status: 500,
                body: JSON.stringify({
                    error: "UnknownError",
                    error_message:
                        "An unknown error occurred, please try again, and report this bug if it persists",
                }),
            };
    }
}
