import express, { Router } from "express";
import { HelloRouter } from "./hello";

const AppRouter: Router = express.Router({mergeParams: true});

AppRouter.use("/hello", HelloRouter);

export { AppRouter };
