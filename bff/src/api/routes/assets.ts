import express from "express";

export const assetsRouter = express.Router();

/**
 * @swagger
 * /api/assets:
 *   get:
 *     summary: Restituisce la lista di tutti gli assets registrati.
 *     responses:
 *       200:
 *         description: Restituisce gli assets.
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/GetAssetsDTO'
 *       500:
 *         description: Errore del server.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetAssetsError'
 *     tags:
 *       - Assets
 *     security:
 *       - Authorization: []
 */
assetsRouter.get("/", 
	
);
