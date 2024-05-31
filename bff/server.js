// Importa le librerie e i moduli necessari
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const swaggerUi = require("swagger-ui-express");
const {apiRouter} = require("./src/api");
const swaggerJson = JSON.parse(fs.readFileSync(`${path.resolve()}/swagger.json`));
const app = express();
require("dotenv").config();

// Configura il middleware
// app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// Configura le rotte
// Route /
app.get("/", (req, res) => {
	res.send("Hello from the backend!!");
});

// Routes SWAGGER API DOCS
app.use("/api-docs/", swaggerUi.serve, swaggerUi.setup(swaggerJson));
app.use("/api", apiRouter);

// Avvia il server
const port = process.env.SERVER_PORT || 4000;
const environment = process.env.ENVIRONMENT_NAME || "none";
app.listen(port, () => {
	console.log(`BFF listening at http://localhost:${port} on ${environment} environment`);
});
