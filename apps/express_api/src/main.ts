import express from "express";
import dotenv from "dotenv";
import { init_postgres } from "./globals";
import { appRouter } from "./routes";

const app = express();

dotenv.config();

const databaseUrl = process.env.POSTGRES_URL;
if (databaseUrl == undefined) {
    throw new Error("Could not get database url");
}

const secretKey = process.env.SECRET_KEY;
if (secretKey == undefined) {
    throw new Error("Could not get secret key");
}

init_postgres(databaseUrl, secretKey);

app.use(express.json());
app.use("/api/v1", appRouter);

const port = process.env.PORT || 3003;

app.listen(port, () => {
    console.log(`Server running on port ${port}, http://localhost:${port}/`);
});
