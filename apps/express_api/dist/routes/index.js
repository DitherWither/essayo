"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRouter = void 0;
const express_1 = __importDefault(require("express"));
const hello_1 = require("./hello");
const AppRouter = express_1.default.Router({ mergeParams: true });
exports.AppRouter = AppRouter;
AppRouter.use("/hello", hello_1.HelloRouter);
