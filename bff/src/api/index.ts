import express from "express";
import {assetsRouter} from "./routes/assets";
import {mapRouter} from "./routes/map";
import {pathsRouter} from "./routes/paths";

export const apiRouter = express.Router();

apiRouter.use("assets", assetsRouter);
apiRouter.use("map", mapRouter);
apiRouter.use("paths", pathsRouter);
