import { CreateUser, User, removePassword } from "backend";
import express, { type Router } from "express";
import { application } from "../globals";
import { backendResponseToExpressResponse } from "../utils";
import { LoginUser } from "backend/dist/services/rest_api/AuthService";
const authRouter: Router = express.Router();

authRouter.post("/signup", async (req, res) => {
    const newUser: CreateUser = req.body;

    const response = await application?.restApiService.authService.signup(
        newUser
    );

    return backendResponseToExpressResponse(res, response);
});

authRouter.post("/login", async (req, res) => {
    const loginUser: LoginUser = req.body;

    const response = await application?.restApiService.authService.login(
        loginUser
    );

    return backendResponseToExpressResponse(res, response);
});

export { authRouter };
