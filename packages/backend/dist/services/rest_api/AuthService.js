"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const __1 = require("../..");
class AuthService {
    usersTable;
    constructor(usersTable) {
        this.usersTable = usersTable;
    }
    async signup(newUser) {
        const { user, error } = await this.usersTable.createNew(newUser);
        if (error != null) {
            return userCreateErrorToResponse(error);
        }
        if (user != null) {
            // TODO: return jwt
            return {
                status: 200,
                body: JSON.stringify({
                    user: (0, __1.removePassword)(user),
                }),
            };
        }
        return {
            status: 500,
            body: JSON.stringify({
                error: "UnknownError",
                error_message: "An unknown error occurred, please try again, and report this bug if it persists",
            }),
        };
    }
}
exports.AuthService = AuthService;
function userCreateErrorToResponse(error) {
    switch (error) {
        case __1.UserCreateError.DatabaseAccessError:
            return {
                status: 500,
                body: JSON.stringify({
                    error: "DatabaseAccessError",
                    error_message: "An error occurred while reading the database, please try again, and report this bug if it persists",
                }),
            };
        case __1.UserCreateError.EmailAlreadyExists:
            return {
                status: 400,
                body: JSON.stringify({
                    error: "EmailAlreadyExists",
                    error_message: "The email entered already exists, please try logging in instead",
                }),
            };
        default:
            return {
                status: 500,
                body: JSON.stringify({
                    error: "UnknownError",
                    error_message: "An unknown error occurred, please try again, and report this bug if it persists",
                }),
            };
    }
}
