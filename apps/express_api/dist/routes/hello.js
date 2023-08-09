"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.helloRouter = void 0;
const express_1 = __importDefault(require("express"));
const backend_1 = require("backend");
const helloRouter = express_1.default.Router();
exports.helloRouter = helloRouter;
helloRouter.get("/", (req, res) => {
    res.send((0, backend_1.hello)());
});
