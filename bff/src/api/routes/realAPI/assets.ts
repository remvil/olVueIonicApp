import express from "express";
import {Observable, of} from "rxjs";
import {map} from "rxjs/operators";
import {getHospitalFakeAssets} from "../../../helpers/functions";

const assetsRouter = express.Router();

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
