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
 *     summary: Restituisce il perimetro dell'edificio nuovo Infotel in formato geojson con una FeatureCollection
 *     responses:
 *       200:
 *         description: Restituisce tutti gli elementi per renderizzare la planimetria dell'edificio di Salerno
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
mapRouter.get("/salerno", (req, res) => {
	const geojsonFilePath = path.resolve(__dirname, "../../../data/geojson/salerno/plan.geojson");
	fs.readFile(geojsonFilePath, "utf8", (err, data) => {
		if (err) {
			return res.status(500).json({error: `Unable to read GeoJSON ${geojsonFilePath}`});
		}
		const geojson = JSON.parse(data);
		res.json(geojson);
	});
});

/**
 * @swagger
 *
 *
 * /api/map/battipaglia/plan4:
 *   get:
 *     summary: Restituisce la planimetria del piano 4 degli uffici Infotel in formato geojson con una FeatureCollection
 *     responses:
 *       200:
 *         description: Restituisce tutti gli elementi per renderizzare la planimetria del piano 4 degli uffici di battipaglia
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
mapRouter.get("/battipaglia/plan4", (req, res) => {
	const geojsonFilePath = path.resolve(__dirname, "../../../data/geojson/battipaglia/infotelPlan4_plan.geojson");
	fs.readFile(geojsonFilePath, "utf8", (err, data) => {
		if (err) {
			return res.status(500).json({error: `Unable to read GeoJSON ${geojsonFilePath}`});
		}
		const geojson = JSON.parse(data);
		res.json(geojson);
	});
});
