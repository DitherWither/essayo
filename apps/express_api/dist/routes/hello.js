"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelloRouter = void 0;
const express_1 = __importDefault(require("express"));
const HelloRouter = express_1.default.Router();
exports.HelloRouter = HelloRouter;
HelloRouter.get("/", (req, res) => {
    res.send("Hello, World");
});
