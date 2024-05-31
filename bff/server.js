// Importa le librerie e i moduli necessari
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path"); // Modulo path built-in
const fs = require("fs"); // Modulo fs built-in
const app = express();

// Configura il middleware
app.use(bodyParser.json());
app.use(cors());

// Configura le rotte
app.get("/", (req, res) => {
	res.send("Hello from the backend!1!");
});

app.get("/api/data", (req, res) => {
	res.json({message: "This is some data from the backend!"});
});

app.post("/api/data", (req, res) => {
	const data = req.body;
	res.json({receivedData: data});
});

app.get("/api/geojsonPerimetro", (req, res) => {
	const geojsonFilePath = path.join(__dirname, "data/geojson/perimetro_infotel.geojson");
	fs.readFile(geojsonFilePath, "utf8", (err, data) => {
		if (err) {
			return res.status(500).json({error: "Unable to read GeoJSON file"});
		}
		const geojson = JSON.parse(data);
		res.json(geojson);
	});
});

// Avvia il server
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Backend listening at http://localhost:${port}`);
});
