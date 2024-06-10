import express, {Request, Response} from "express";
import path from "path";
import fs from "fs";

export const mapRouter = express.Router();

/**
 * @swagger
 *
 *
 * /api/map:
 *   get:
 *     summary: Restituisce il perimetro dell'edificio in formato geojson con una FeatureCollection
 *     responses:
 *       200:
 *         description: Restituisce tutti gli elementi per renderizzare il perimetro della mappa
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FeatureCollection'
 *         
 *     tags:
 *       - Mappa
 *
 *  @swagger
 * components:
 *   schema:
 *    $ref: '#/components/schemas/GenericError'
 *
 */
mapRouter.get("/", (req, res) => {
	const geojsonFilePath = path.resolve(__dirname, "../../../data/geojson/perimetro_infotel.geojson");
	fs.readFile(geojsonFilePath, "utf8", (err, data) => {
		if (err) {
			return res.status(500).json({error: `Unable to read GeoJSON ${geojsonFilePath}`});
		}
		const geojson = JSON.parse(data);
		res.json(geojson);
	});
});
