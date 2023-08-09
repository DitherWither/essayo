import postgres from "postgres";
import { CreateUser, User, UserCreateError, UsersTable } from "../../models/user";
import { PostgresDatabase } from "./PostgresDatabase";
export declare class PgUsersTable implements UsersTable {
    sql: postgres.Sql;
    constructor(database: PostgresDatabase);
    getAll(): Promise<User[]>;
    getById(userId: string): Promise<User | null>;
    getByEmail(email: string): Promise<User | null>;
    createNew(user: CreateUser): Promise<{
        user: User | null;
        error: UserCreateError | null;
    }>;
}
//# sourceMappingURL=PgUsersTable.d.ts.map