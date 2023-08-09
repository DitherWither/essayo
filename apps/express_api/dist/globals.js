"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init_postgres = exports.application = void 0;
const backend_1 = require("backend");
exports.application = null;
function init_postgres(database_url, secret_key) {
    const database = new backend_1.PostgresDatabase(database_url + "?sslmode=require");
    const usersTable = new backend_1.PgUsersTable(database);
    const authTokenGenerator = new backend_1.JWTAuthTokenGenerator(secret_key);
    exports.application = new backend_1.Application(usersTable, authTokenGenerator);
}
exports.init_postgres = init_postgres;
