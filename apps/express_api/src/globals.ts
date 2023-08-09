import { Application, PgUsersTable, PostgresDatabase } from "backend";

export let application: Application | null = null;

export function init_postgres(database_url: string) {
    const database = new PostgresDatabase(database_url);
    const usersTable = new PgUsersTable(database);

    application = new Application(usersTable);
}
