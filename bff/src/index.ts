// import {swaggerJSDoc} from "swagger-jsdoc";
import express, {Request, Response} from "express";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import fs from "fs";
import swaggerUi from "swagger-ui-express";
import {apiRouter} from "./api/index";
import {CORSHOSTS, ENVIRONMENT, SERVER_PORT} from "./envconfig";
import {Logger, initLogger} from "./api/logger";
import {swaggerSpec} from "./swagger";

if (!SERVER_PORT || !ENVIRONMENT) process.exit(1);

initLogger();

const swaggerJson = JSON.parse(fs.readFileSync(`${path.resolve()}/swagger.json`, "utf-8"));
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

/**
 * @swagger
 * /:
 *  get:
 *    summary: Restituisce un messaggio di saluto
 *    responses:
 *      200:
 *        message: Hello from the backend!
 * 			404:
 * 				message: Cannot GET /
 *    tags:
 *      - RootURL
 *
 * @swagger
 * components:
 *   schema:
 *    $ref: '#/components/schemas/GenericError'
 *
 */
// Configura le routes
app.get("/", (req, res) => {
	res.send("Hello from the backend!");
});

app.use("/api-docs/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api", apiRouter);

// Avvia il server
app.listen(SERVER_PORT, () => {
	console.log(`BFF listening at http://localhost:${SERVER_PORT} on ${ENVIRONMENT} environment`);
});
