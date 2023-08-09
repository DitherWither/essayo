"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresDatabase = void 0;
const postgres_1 = __importDefault(require("postgres"));
class PostgresDatabase {
    database_url;
    connection;
    constructor(database_url) {
        this.database_url = database_url;
        this.connection = (0, postgres_1.default)(database_url);
    }
}
exports.PostgresDatabase = PostgresDatabase;
