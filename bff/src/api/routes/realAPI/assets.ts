import express from "express";
import {Observable, of} from "rxjs";
import {map} from "rxjs/operators";
import {getHospitalFakeAssets} from "../../../helpers/functions";

const assetsRouter = express.Router();

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
assetsRouter.get("/:location?", (req: any, res: any) => {
	console.log("TEST: Hello from  '/assets//:location?' route ");
	const resp$ = of("TEST: Hello from  '/assets//:location?' route ");
	// Simuliamo una chiamata asincrona con Observable
	// const assets$ = new Observable((observer) => {
	// 	const assets = getHospitalFakeAssets();
	// 	if (assets) {
	// 		observer.next(assets);
	// 		observer.complete();
	// 	} else {
	// 		observer.error({error: "Assets not Found"});
	// 	}
	// });

	// Gestione della risposta con RxJS
	resp$
		.pipe(
			map((data) => {
				res.status(200).json({message: data});
			})
		)
		.subscribe(
			() => {},
			(error) => {
				res.status(404).json(error);
			}
		);
});

export {assetsRouter};
