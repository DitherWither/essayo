import { CreateUser, User, removePassword } from "backend";
import express, { type Router } from "express";
import { application } from "../globals";
import { backendResponseToExpressResponse } from "../utils";
const authRouter: Router = express.Router();

authRouter.post("/signup", async (req, res) => {
    const newUser: CreateUser = req.body;

    const response = await application?.restApiService.authService.signup(newUser);

    return backendResponseToExpressResponse(res, response);
});

authRouter.post("/login", (req, res) => {
    res.send(JSON.stringify({ error: "not implemented" }));
});

authRouter.post("/logout", (req, res) => {
    res.send(JSON.stringify({ error: "not implemented" }));
});

export { authRouter };
