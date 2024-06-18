import express from "express";
import path from "path";
import fs from "fs";
import {Feature} from "../types";

export const assetsRouter = express.Router();

/**
 * @swagger
 * /api/assets/salerno:
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
assetsRouter.get("/salerno", (req, res) => {
	const geojsonFilePath = path.resolve(__dirname, "../../../data/geojson/salerno/assets_aziendali.geojson");
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
 * /api/assets/salerno/{id}:
 *   get:
 *     summary: Restituisce l'asset con l'id passato per parametro.
 *     responses:
 *       200:
 *         description: Restituisce un singolo asset con tutte le sue proprietà.
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Feature'
 *       404:
 *         description: >
 *            Riporta un messaggio che specifica che non è possibile trovare la risorsa
 *            con l'id richiesto
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GenericError'
 *     tags:
 *       - Assets
 *     security:
 *       - Authorization: []
 */
assetsRouter.get("/salerno/:id", (req, res) => {
	const geojsonFilePath = path.resolve(__dirname, "../../../data/geojson/salerno/assets_aziendali.geojson");
	fs.readFile(geojsonFilePath, "utf8", (err, data) => {
		if (err) {
			return res.status(500).json({error: `Unable to read GeoJSON ${geojsonFilePath}`});
		}
		const geojson = JSON.parse(data);
		const feats: Feature[] = geojson.features;
		const requiredId = req.params.id;
		const foundFeature = feats.find((feature) => feature.properties.id === requiredId);

		if (foundFeature) {
			res.status(200).json(foundFeature);
		} else {
			res.status(404).json({error: "Asset required not found"});
		}
	});
});


/**
 * @swagger
 * /api/assets/battipaglia:
 *   get:
 *     summary: Restituisce la lista di tutti gli assets registrati negli uffici di Battipaglia.
 *     responses:
 *       200:
 *         description: Restituisce gli assets presenti negli uffici di battipaglia.
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
assetsRouter.get("/battipaglia", (req, res) => {
	const geojsonFilePath = path.resolve(__dirname, "../../../data/geojson/battipaglia/infotelPlan4_assets.geojson");
	fs.readFile(geojsonFilePath, "utf8", (err, data) => {
		if (err) {
			return res.status(500).json({error: `Unable to read GeoJSON ${geojsonFilePath}`});
		}
		const geojson = JSON.parse(data);
		res.json(geojson);
	});
});