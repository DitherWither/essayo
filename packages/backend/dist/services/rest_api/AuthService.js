"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const argon2 = __importStar(require("argon2"));
const __1 = require("../..");
class AuthService {
    usersTable;
    authTokenGenerator;
    constructor(usersTable, authTokenGenerator) {
        this.usersTable = usersTable;
        this.authTokenGenerator = authTokenGenerator;
    }
    async signup(newUser) {
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
    async login(loginUser) {
        const user = await this.usersTable.getByEmail(loginUser.email);
        if (user == null) {
            return {
                status: 400,
                body: JSON.stringify({
                    error: "UserDoesNotExist",
                    error_message: "The entered email does not exist, create an account instead",
                }),
            };
        }
        let password = user.password;
        if (password == undefined) {
            return {
                status: 500,
                body: JSON.stringify({
                    error: "UnknownError",
                    error_message: "An unknown error occurred, please try again, and report this bug if it persists",
                }),
            };
        }
        if (await argon2.verify(password, loginUser.password)) {
            let token = this.authTokenGenerator.createToken(user.userId);
            return {
                status: 201,
                body: JSON.stringify({
                    token,
                    user: (0, __1.removePassword)(user),
                }),
            };
        }
        else {
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
