import express from "express";
import * as oracleController from "../controller/oracleController";

const router = express.Router();
/**
 * @swagger
 * definitions:
 *   queryPriceReq:
 *     properties:
 *       quote_asset:
 *         type: string
 *       base_asset:
 *         type: string
 */ 

/**
 * @swagger
 * /oracle/queryPrice:
 *  post:
 *    tags:
 *      - oracle
 *    summary: query infomatio of the specific block height
 *    description: query infomatio of the specific block height
 *    requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/queryPriceReq'
 *    responses:
 *      200:
 *        description: return the data
 */
router.post("/queryPrice", oracleController.getXdrPriceController);
export default router;