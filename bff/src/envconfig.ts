import dotenv from "dotenv";
dotenv.config();

export type EnvType = keyof typeof EnvTypeEnum;
enum EnvTypeEnum {
	"dev" = "dev",
	"prod" = "prod",
	"qa" = "qa",
}

export const CORSHOSTS = process.env.ENABLE_CORS || "*";
export const SERVER_PORT = process.env.SERVER_PORT || 3001;
export const ENVIRONMENT = process.env.ENVIRONMENT_NAME as EnvType;
export const VERSION = require("../package.json").version;
export const CLIENTS = new Map<string, any>();
export const SECRETKEY = process.env.SECRET_KEY ?? "unaChiaveSegreta";
