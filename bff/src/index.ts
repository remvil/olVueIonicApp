import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import fs from "fs";
import swaggerUi from "swagger-ui-express";
import {apiRouter} from "./api/index"; // Senza estensione .ts
import dotenv from "dotenv";
dotenv.config();

const swaggerJson = JSON.parse(fs.readFileSync(`${path.resolve()}/swagger.json`, "utf-8"));
const app = express();

// Configura il middleware
app.use(express.json());
app.use(cors());

// Configura le routes
app.get("/", (req, res) => {
	res.send("Hello from the backend!!");
});

app.use("/api-docs/", swaggerUi.serve, swaggerUi.setup(swaggerJson));
app.use("/api", apiRouter);

// Avvia il server
const port = process.env.SERVER_PORT || 4000;
const environment = process.env.ENVIRONMENT_NAME || "none";
app.listen(port, () => {
	console.log(`BFF listening at http://localhost:${port} on ${environment} environment`);
});
