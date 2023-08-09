import express from "express";
import dotenv from "dotenv";
import { init_postgres } from "./globals";
import { appRouter } from "./routes";

const app = express();

dotenv.config();

const databaseUrl = process.env.POSTGRES_URL;
if (databaseUrl == undefined) {
    throw new Error("Could not get database url");
}

const secretKey = process.env.SECRET_KEY;
if (secretKey == undefined) {
    throw new Error("Could not get secret key");
}

init_postgres(databaseUrl, secretKey);

app.use(express.json());
app.use("/api/v1", appRouter);

// START OF DEBUG STATEMENTS

function print(path: any, layer: any) {
    if (layer.route) {
        layer.route.stack.forEach(
            print.bind(null, path.concat(split(layer.route.path)))
        );
    } else if (layer.name === "router" && layer.handle.stack) {
        layer.handle.stack.forEach(
            print.bind(null, path.concat(split(layer.regexp)))
        );
    } else if (layer.method) {
        console.log(
            "%s /%s",
            layer.method.toUpperCase(),
            path.concat(split(layer.regexp)).filter(Boolean).join("/")
        );
    }
}

function split(thing: any) {
    if (typeof thing === "string") {
        return thing.split("/");
    } else if (thing.fast_slash) {
        return "";
    } else {
        var match = thing
            .toString()
            .replace("\\/?", "")
            .replace("(?=\\/|$)", "$")
            .match(
                /^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//
            );
        return match
            ? match[1].replace(/\\(.)/g, "$1").split("/")
            : "<complex:" + thing.toString() + ">";
    }
}

app._router.stack.forEach(print.bind(null, []));

// END OF DEBUG STATEMENTS

const port = process.env.PORT || 3003;

app.listen(port, () => {
    console.log(`Server running on port ${port}, http://localhost:${port}/`);
});
