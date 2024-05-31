import {assetsRouter} from "./routes/assets";
import express from "express";
import {mapRouter} from "./routes/map";
import {pathsRouter} from "./routes/paths";

export const apiRouter = express.Router();

/**
 * @swagger
 * /api/healthcheck:
 *  get:
 *    summary: Restituisce un messaggio di saluto
 *    responses:
 *      200:
 *        message: Alive and listening on port 3000
 *    tags:
 *      - Healthcheck
 *
 *  @swagger
 * components:
 *   schema:
 *    $ref: '#/components/schemas/GenericError'
 *
 */
// apiRouter.get("/healthcheck", (_req: Request, res: Response) => res.json({message: `I'm alive and answering on port ${ServerPort}`}));

apiRouter.use("assets", assetsRouter);
apiRouter.use("map", mapRouter);
apiRouter.use("paths", pathsRouter);

// apiRouter.get("/sse", sseHandler);
// apiRouter.options("/sse", sseHandler);
