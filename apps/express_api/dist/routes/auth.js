"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const globals_1 = require("../globals");
const utils_1 = require("../utils");
const authRouter = express_1.default.Router();
exports.authRouter = authRouter;
authRouter.post("/signup", async (req, res) => {
    const newUser = req.body;
    const response = await globals_1.application?.restApiService.authService.signup(newUser);
    return (0, utils_1.backendResponseToExpressResponse)(res, response);
});
authRouter.post("/login", (req, res) => {
    res.send(JSON.stringify({ error: "not implemented" }));
});
authRouter.post("/logout", (req, res) => {
    res.send(JSON.stringify({ error: "not implemented" }));
});
