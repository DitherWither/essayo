import express from "express";
import dotenv from "dotenv";
import { init_postgres } from "./globals";
import { appRouter } from "./routes";

const app = express();

dotenv.config();
const database_url = process.env.POSTGRES_URL;
if (database_url == undefined) {
    throw new Error("Could not get database url");
}

init_postgres(database_url);

app.use(express.json());
app.use("/api/v1", appRouter);

const port = process.env.PORT || 3003;

app.listen(port, () => {
    console.log(`Server running on port ${port}, http://localhost:${port}/`);
});
