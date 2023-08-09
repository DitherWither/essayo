import postgres from "postgres";
import * as argon2 from "argon2";
import {
    CreateUser,
    User,
    UserCreateError,
    UsersTable,
} from "../../models/user";
import { PostgresDatabase } from "./PostgresDatabase";

export class PgUsersTable implements UsersTable {
    sql: postgres.Sql;

    constructor(database: PostgresDatabase) {
        this.sql = database.connection;
    }

    async getAll(): Promise<User[]> {
        const dbUsers = await this.sql`
            SELECT * FROM users
            `;

        const users = dbUsers.map((e) => {
            return dbUserToUser(e as DbUser);
        });

        return users;
    }

    async getById(userId: string): Promise<User | null> {
        const dbUser = await this.sql`
            SELECT * FROM users
            WHERE user_id = ${userId}
        `;

        if (dbUser.length <= 0) {
            return null;
        } else {
            return dbUserToUser(dbUser[0] as DbUser);
        }
    }

    async getByEmail(email: string): Promise<User | null> {
        const dbUser = await this.sql`
            SELECT * FROM users
            WHERE email = ${email}
        `;

        if (dbUser.length <= 0) {
            return null;
        } else {
            return dbUserToUser(dbUser[0] as DbUser);
        }
    }

    async createNew(
        user: CreateUser
    ): Promise<{ user: User | null; error: UserCreateError | null }> {
        // check if user already exists
        if ((await this.getByEmail(user.email)) != null) {
            return {
                user: null,
                error: UserCreateError.EmailAlreadyExists,
            };
        }

        // hash password
        const passwordHash = await argon2.hash(user.password);
        try {
            // insert into db
            const dbUser = await this.sql`
                INSERT INTO users (full_name, password, email)
                VALUES (${user.fullName}, ${passwordHash}, ${user.email})
                RETURNING *
            `;

            // convert dbuser to a normal user
            if (dbUser.length <= 0) {
                return {
                    user: null,
                    error: UserCreateError.DatabaseAccessError,
                };
            } else {
                return {
                    user: dbUserToUser(dbUser[0] as DbUser),
                    error: null,
                };
            }
        } catch (err) {
            return {
                user: null,
                error: UserCreateError.DatabaseAccessError,
            };
        }
    }
}

interface DbUser {
    user_id: string;

    full_name: string;
    email: string;
    password: string;

    created_at: Date;
    updated_at: Date;
}

function dbUserToUser(dbUser: DbUser): User {
    return {
        userId: dbUser.user_id,

        fullName: dbUser.full_name,
        email: dbUser.email,
        password: dbUser.password,

        createdAt: dbUser.created_at,
        updatedAt: dbUser.updated_at,
    };
}
