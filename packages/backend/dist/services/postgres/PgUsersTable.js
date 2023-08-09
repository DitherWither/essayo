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
exports.PgUsersTable = void 0;
const argon2 = __importStar(require("argon2"));
const user_1 = require("../../models/user");
class PgUsersTable {
    sql;
    constructor(database) {
        this.sql = database.connection;
    }
    async getAll() {
        const dbUsers = await this.sql `
            SELECT * FROM users
            `;
        const users = dbUsers.map((e) => {
            return dbUserToUser(e);
        });
        return users;
    }
    async getById(userId) {
        const dbUser = await this.sql `
            SELECT * FROM users
            WHERE user_id = ${userId}
        `;
        if (dbUser.length <= 0) {
            return null;
        }
        else {
            return dbUserToUser(dbUser[0]);
        }
    }
    async getByEmail(email) {
        const dbUser = await this.sql `
            SELECT * FROM users
            WHERE email = ${email}
        `;
        if (dbUser.length <= 0) {
            return null;
        }
        else {
            return dbUserToUser(dbUser[0]);
        }
    }
    async createNew(user) {
        // check if user already exists
        if ((await this.getByEmail(user.email)) != null) {
            return {
                user: null,
                error: user_1.UserCreateError.EmailAlreadyExists,
            };
        }
        // hash password
        const passwordHash = await argon2.hash(user.password);
        try {
            // insert into db
            const dbUser = await this.sql `
                INSERT INTO users (full_name, password, email)
                VALUES (${user.fullName}, ${passwordHash}, ${user.email})
                RETURNING *
            `;
            // convert dbuser to a normal user
            if (dbUser.length <= 0) {
                return {
                    user: null,
                    error: user_1.UserCreateError.DatabaseAccessError,
                };
            }
            else {
                return {
                    user: dbUserToUser(dbUser[0]),
                    error: null,
                };
            }
        }
        catch (err) {
            return {
                user: null,
                error: user_1.UserCreateError.DatabaseAccessError,
            };
        }
    }
}
exports.PgUsersTable = PgUsersTable;
function dbUserToUser(dbUser) {
    return {
        userId: dbUser.user_id,
        fullName: dbUser.full_name,
        email: dbUser.email,
        password: dbUser.password,
        createdAt: dbUser.created_at,
        updatedAt: dbUser.updated_at,
    };
}
