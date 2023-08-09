import {
    Application,
    JWTAuthTokenGenerator,
    PgUsersTable,
    PostgresDatabase,
} from "backend";

export let application: Application | null = null;

export function init_postgres(database_url: string, secret_key: string) {

    const database = new PostgresDatabase(database_url + "?sslmode=require");
    const usersTable = new PgUsersTable(database);
    const authTokenGenerator = new JWTAuthTokenGenerator(secret_key);

    application = new Application(usersTable, authTokenGenerator);
}
