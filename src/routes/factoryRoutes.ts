import express from "express";
import * as factoryController from "../controller/factoryController";

const router = express.Router();
/**
 * @swagger
 * definitions:
 *   factoryMintReq:
 *     properties:
 *       token_id:
 *         type: string
 *       canister_name: 
 *         type: string
 *       name:
 *         type: string
 *       image_url:
 *         type: string
 *       canister_id:
 *         type: string
 *       principal:
 *         type: string
 *       description:
 *         type: string
 */ 

/**
 * @swagger
 * /canister_factory/factory_mint:
 *  post:
 *    tags:
 *      - canister_factory
 *    summary: send mint request to canister factory
 *    description: send mint request to canister factory
 *    requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/factoryMintReq'
 *    responses:
 *      200:
 *        description: return the data
 */
router.post("/factory_mint", factoryController.factory_mint_controller);
export default router