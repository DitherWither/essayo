import postgres from "postgres";

export class PostgresDatabase {
    database_url: string;
    public connection: postgres.Sql;

    constructor(database_url: string) {
        this.database_url = database_url;
        this.connection = postgres(database_url)
    }
}
