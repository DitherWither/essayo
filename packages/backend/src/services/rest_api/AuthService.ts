import * as argon2 from "argon2";
import {
    UserCreateError,
    CreateUser,
    UsersTable,
    removePassword,
    AuthTokenGenerator,
} from "../..";
import { RestApiResponse } from "./types";

export class AuthService {
    private usersTable: UsersTable;
    private authTokenGenerator: AuthTokenGenerator;

    constructor(
        usersTable: UsersTable,
        authTokenGenerator: AuthTokenGenerator
    ) {
        this.usersTable = usersTable;
        this.authTokenGenerator = authTokenGenerator;
    }

    async signup(newUser: CreateUser): Promise<RestApiResponse> {
        const { user, error } = await this.usersTable.createNew(newUser);
        if (error != null) {
            return userCreateErrorToResponse(error);
        }
        if (user != null) {
            const token = this.authTokenGenerator.createToken(user.userId);
            return {
                status: 201,
                body: JSON.stringify({
                    token,
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

    async login(loginUser: LoginUser): Promise<RestApiResponse> {
        const user = await this.usersTable.getByEmail(loginUser.email);

        if (user == null) {
            return {
                status: 400,
                body: JSON.stringify({
                    error: "UserDoesNotExist",
                    error_message:
                        "The entered email does not exist, create an account instead",
                }),
            };
        }

        let password = user.password;
        if (password == undefined) {
            return {
                status: 500,
                body: JSON.stringify({
                    error: "UnknownError",
                    error_message:
                        "An unknown error occurred, please try again, and report this bug if it persists",
                }),
            };
        }

        if (await argon2.verify(password, loginUser.password)) {
            let token = this.authTokenGenerator.createToken(user.userId);
            return {
                status: 201,
                body: JSON.stringify({
                    token,
                    user: removePassword(user),
                }),
            };
        } else {
            return {
                status: 400,
                body: JSON.stringify({
                    error: "WrongPassword",
                    error_message: "Invalid Password, please try again",
                }),
            };
        }
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

export interface LoginUser {
    email: string;
    password: string;
}
