import express, {Request, Response} from "express";
import {assetsRouter} from "./routes/assets";
import {mapRouter} from "./routes/map";
import {pathsRouter} from "./routes/paths";
import {SERVER_PORT} from "../envconfig";

export const apiRouter = express.Router();

/**
 * @swagger
 * /api/healthcheck:
 *  get:
 *    summary: Restituisce un messaggio di saluto
 *    responses:
 *      200:
 *        message: I'm alive and answering on port XXXX
 * 			404:
 * 				message: Cannot GET /healthcheck
 *    tags:
 *      - Healthcheck
 *
 *  @swagger
 * components:
 *   schema:
 *    $ref: '#/components/schemas/GenericError'
 *
 */
apiRouter.get("/healthcheck", (_req: Request, res: Response) => res.json({message: `I'm alive and answering on port ${SERVER_PORT}`}));

apiRouter.use("/assets", assetsRouter);
apiRouter.use("/map", mapRouter);
apiRouter.use("/paths", pathsRouter);
