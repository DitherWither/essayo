import express, { Router } from "express";
import { authRouter } from "./auth";

const appRouter: Router = express.Router({ mergeParams: true });

appRouter.use("/auth", authRouter)

export { appRouter };
