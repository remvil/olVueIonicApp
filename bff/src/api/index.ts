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
 *    summary: Returns a message regarding the health status of the server
 *    description: Returns a json message about the server status and listening port
 *    responses:
 *      '200':
 *        description: I'm alive and listening on port XXXX
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/HealthcheckResponse'
 *      '404':
 *        description:  Not Found
 *    tags:
 *      - Healthcheck
 *
 * @swagger
 * 	components:
 *   schema:
 *    $ref: '#/components/schemas/GenericError'
 *
 */
apiRouter.get("/healthcheck", (_req: Request, res: Response) => res.json({message: `Hey I'm still alive and listening on port ${SERVER_PORT}`}));

apiRouter.use("/assets", assetsRouter);
apiRouter.use("/map", mapRouter);
// apiRouter.use("/paths", pathsRouter);
