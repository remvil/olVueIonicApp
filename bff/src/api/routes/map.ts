import express from "express";
import path from "path";
import fs from "fs";

export const mapRouter = express.Router();

mapRouter.get("/");

mapRouter.get("/perimetro", (req, res) => {
	const geojsonFilePath = path.join(__dirname, "data/geojson/perimetro_infotel.geojson");
	fs.readFile(geojsonFilePath, "utf8", (err, data) => {
		if (err) {
			return res.status(500).json({error: "Unable to read GeoJSON file"});
		}
		const geojson = JSON.parse(data);
		res.json(geojson);
	});
});
