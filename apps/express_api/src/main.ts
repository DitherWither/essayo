import express from "express";
import { AppRouter } from "./routes";

const app = express();

app.use("/api/v1", AppRouter)

const port = process.env.PORT || 3003;

app.listen(port, () => {
    console.log(`Server running on port ${port}, http://localhost:${port}/`);
})
