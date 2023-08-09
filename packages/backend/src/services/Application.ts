import { UsersTable } from "..";
import { RestApiService } from "./rest_api";

export class Application {
    usersTable: UsersTable;
    restApiService: RestApiService;

    constructor(usersTable: UsersTable) {
        this.usersTable = usersTable;
        this.restApiService = new RestApiService(this.usersTable);
    }
}
