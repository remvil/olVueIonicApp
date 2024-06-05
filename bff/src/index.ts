// import {swaggerJSDoc} from "swagger-jsdoc";
import express, {Request, Response} from "express";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import fs from "fs";
import swaggerUi from "swagger-ui-express";
import {apiRouter} from "./api/index";
import {CORSHOSTS, ENVIRONMENT, SERVER_PORT} from "./envconfig";
import {Logger, initLogger} from "./helpers/logger";
import {swaggerSpec} from "./swagger";

if (!SERVER_PORT || !ENVIRONMENT) process.exit(1);

initLogger();
const app = express();

// Configura il middleware
app.use(express.json());
if (CORSHOSTS) {
	app.use(cors());
	app.options(CORSHOSTS, cors());
}
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api", apiRouter);

// Avvia il server
app.listen(SERVER_PORT, () => {
	console.log(`BFF listening at http://localhost:${SERVER_PORT} on ${ENVIRONMENT} environment`);
});
