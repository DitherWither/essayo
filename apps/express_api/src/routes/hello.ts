import express, { type Router } from "express";

const HelloRouter: Router = express.Router();

HelloRouter.get("/", (req, res) => {
    res.send("Hello, World");
});

export { HelloRouter };
