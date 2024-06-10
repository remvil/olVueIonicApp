import express from "express";
import path from "path";
import fs from "fs";

export const assetsRouter = express.Router();

/**
 * @swagger
 * /api/assets:
 *   get:
 *     summary: Restituisce la lista di tutti gli assets registrati.
 *     responses:
 *       200:
 *         description: Restituisce gli assets.
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/FeatureCollection'
 *       500:
 *         description: Errore del server. Non riesce a trovare la risorsa richiesta
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetAssetsError'
 *     tags:
 *       - Assets
 *     security:
 *       - Authorization: []
 */
assetsRouter.get("/", (req, res) => {
	const geojsonFilePath = path.resolve(__dirname, "../../../data/geojson/assets_aziendali.geojson");
	fs.readFile(geojsonFilePath, "utf8", (err, data) => {
		if (err) {
			return res.status(500).json({error: `Unable to read GeoJSON ${geojsonFilePath}`});
		}
		const geojson = JSON.parse(data);
		res.json(geojson);
	});
});
