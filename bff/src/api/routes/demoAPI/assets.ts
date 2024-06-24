import express from "express";
import {Observable, of} from "rxjs";
import {map} from "rxjs/operators";
import {getHospitalFakeAssets} from "../../../helpers/functions";
import {Logger} from "../../../helpers/logger";
import {log} from "console";

const dummyAssetsRouter = express.Router();

/**
 * @swagger
 * /api/assets/{location}:
 *   get:
 *     summary: Restituisce la lista di tutti gli asset di una determinata location
 *     responses:
 *       200:
 *         description: Restituisce la lista degli asset
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HospitalAsset'
 *       404:
 *         description: >
 *            Riporta un messaggio che specifica che non è possibile trovare la risorsa richiesta
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GenericError'
 *     tags:
 *       - Assets
 *     security:
 *       - Authorization: []
 */
dummyAssetsRouter.get("/:location?", (req: any, res: any) => {
	Logger.writeEvent(`Requested resources from  ${req.originalUrl} route `);
	const assets$ = new Observable((observer) => {
		const assets = getHospitalFakeAssets();
		if (assets) {
			observer.next(assets);
			observer.complete();
		} else {
			observer.error({error: "Assets not Found"});
		}
	});

	// Gestione della risposta con RxJS
	assets$
		.pipe(
			map((assets) => {
				res.status(200).json(assets);
			})
		)
		.subscribe(
			() => {},
			(error) => {
				Logger.writeException(error);
				res.status(404).json(error);
			}
		);
});

export {dummyAssetsRouter};
