"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const app = (0, express_1.default)();
app.use("/api/v1", routes_1.appRouter);
const port = process.env.PORT || 3003;
app.listen(port, () => {
    console.log(`Server running on port ${port}, http://localhost:${port}/`);
});
