"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const express_1 = __importDefault(require("express"));
const hello_1 = require("./hello");
const appRouter = express_1.default.Router({ mergeParams: true });
exports.appRouter = appRouter;
appRouter.use("/hello", hello_1.helloRouter);
