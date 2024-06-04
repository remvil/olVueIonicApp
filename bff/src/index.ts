import express from "express";
import cors from "cors";
// import bodyParser from "body-parser";
import path from "path";
import fs from "fs";
import swaggerUi from "swagger-ui-express";
import {apiRouter} from "./api/index"; // Senza estensione .ts
import {CORSHOSTS, ENVIRONMENT, SERVER_PORT} from "./envconfig";
import {Logger, initLogger} from "./api/logger";

initLogger();

const swaggerJson = JSON.parse(fs.readFileSync(`${path.resolve()}/swagger.json`, "utf-8"));
const app = express();

// Configura il middleware
app.use(express.json());
if (CORSHOSTS) {
	app.use(cors());
	app.options(CORSHOSTS, cors());
}

// Configura le routes
app.get("/", (req, res) => {
	res.send("Hello from the backend!");
});

app.use("/api-docs/", swaggerUi.serve, swaggerUi.setup(swaggerJson));
app.use("/api", apiRouter);

// Avvia il server
app.listen(SERVER_PORT, () => {
	console.log(`BFF listening at http://localhost:${SERVER_PORT} on ${ENVIRONMENT} environment`);
});
// .on("error", console.error("error"));
