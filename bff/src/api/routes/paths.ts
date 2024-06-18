import express, {Request, Response} from "express";
import path from "path";
import fs from "fs";

export const pathsRouter = express.Router();

/**
 * @swagger
 *
 *
 * /api/map/plan4:
 *   get:
 *     summary: Restituisce tutti i possibili percorsi per navigare all'interno dell'edificio
 *     responses:
 *       200:
 *         description: Restituisce la Feature Collection contenente tutti i possibili segmenti percorribili
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FeatureCollection'
 *       500:
 *         description: Errore del server. Non riesce a trovare la risorsa richiesta
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GenericError'
 *     tags:
 *       - Mappa
 *     security:
 *       - Authorization: []
 *
 *  @swagger
 * components:
 *   schema:
 *    $ref: '#/components/schemas/GenericError'
 *
 */
pathsRouter.get("/battipaglia/plan4", (req, res) => {
	const geojsonFilePath = path.resolve(__dirname, "../../../data/geojson/battipaglia/infotelPlan4_path.geojson");
	fs.readFile(geojsonFilePath, "utf8", (err, data) => {
		if (err) {
			return res.status(500).json({error: `Unable to read GeoJSON ${geojsonFilePath}`});
		}
		const geojson = JSON.parse(data);
		res.json(geojson);
	});
});
