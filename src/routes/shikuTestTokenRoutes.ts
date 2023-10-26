import express from "express";
import * as shikuTestTokenController from "../controller/shikuTestTokenController";
const router = express.Router();
/**
 * @swagger
 * definitions:
 *   getSTTBalanceReq:
 *     properties:
 *       pid:
 *         type: string
 *       canister_id:
 *         type: string
*/ 
/**
 * @swagger
 * definitions:
 *   getSTTMetadataReq:
 *     properties:
 *       canister_id:
 *         type: string
*/ 

/**
 * @swagger
 * definitions:
 *   STT_TransferReq:
 *     properties:
 *       pid:
 *         type: string
 *       amount:
 *         type: string
 *       canister_id:
 *         type: string
*/ 

/**
 * @swagger
 * definitions:
 *   getSTT_TransactionReq:
 *     properties:
 *       start:
 *         type: string
 *       length:
 *         type: string
 *       canister_id:
 *         type: string
*/ 

// /**
//  * @swagger
//  * /shiku_test_token/getSTTBalance:
//  *  post:
//  *    tags:
//  *      - shiku test token
//  *    summary: get balance of STT token.
//  *    description: get balance of STT token.
//  *    requestBody:
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/definitions/getSTTBalanceReq'
//  *    responses:
//  *      200:
//  *        description: return balance of shiku test token
//  */
// router.post("/getSTTBalance", shikuTestTokenController.stt_balance_of_controller);

/**
 * @swagger
 * /shiku_test_token/getSTTMetadata:
 *  post:
 *    tags:
 *      - shiku test token
 *    summary: get metadata of STT token.
 *    description: get metadata of STT token.
 *    requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/getSTTMetadataReq'
 *    responses:
 *      200:
 *        description: return metadata of shiku test token
 */
router.post("/getSTTMetadata", shikuTestTokenController.stt_metadata_controller);

/**
 * @swagger
 * /shiku_test_token/STT_Transfer:
 *  post:
 *    tags:
 *      - shiku test token
 *    summary: transfer STT token to another icp address.
 *    description: transfer STT token to another icp address.
 *    requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/STT_TransferReq'
 *    responses:
 *      200:
 *        description: return block index of transferred shiku test token
 */
router.post("/STT_Transfer", shikuTestTokenController.stt_transfer_controller);

/**
 * @swagger
 * /shiku_test_token/getSTT_Transaction:
 *  post:
 *    tags:
 *      - shiku test token
 *    summary: transfer STT token to another icp address.
 *    description: transfer STT token to another icp address.
 *    requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/getSTT_TransactionReq'
 *    responses:
 *      200:
 *        description: return block index of transferred shiku test token
 */
router.post("/getSTT_Transaction", shikuTestTokenController.stt_get_transactions);

export default router;