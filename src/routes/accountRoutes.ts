import express from "express";
import * as accountController from "../controller/accountController";

const router = express.Router();
/**
 * @swagger
 * definitions:
 *   queryNewestBlockReq:
 *     properties:
 *       canister_id:
 *         type: string
 */ 


/**
 * @swagger
 * definitions:
 *   tokenBalanceReq:
 *     properties:
 *       user:
 *         type: string
 *       canister_id:
 *         type: string
 */ 
/**
 * @swagger
 * definitions:
 *   tokenBalanceFakeReq:
 *     properties:
 *       user:
 *         type: string
 *       canister_id:
 *         type: string
 */ 

/**
 * @swagger
 * definitions:
 *   queryBlockReq:
 *     properties:
 *       index:
 *         type: string
 *       canister_id:
 *         type: string
 */
/**
 * @swagger
 * definitions:
 *   queryBlockFakeReq:
 *     properties:
 *       index:
 *         type: string
 *       canister_id:
 *         type: string
 */

/**
 * @swagger
 * definitions:
 *   queryMemnicReq:
 *     properties:
 *       pid:
 *         type: string
 */

/**
 * @swagger
 * definitions:
 *   scanBlockReq:
 *     properties:
 *       start:
 *         type: string
 *       end:
 *         type: string
 */

/**
 * @swagger
 * definitions:
 *   RefundReq:
 *     properties:
 *       from_principal:
 *         type: string
 *       to_principal:
 *         type: string
 *       amount:
 *         type: number
 *       canister_id:
 *         type: string
 */ 
/**
 * @swagger
 * definitions:
 *   RefundFakeReq:
 *     properties:
 *       from_principal:
 *         type: string
 *       to_principal:
 *         type: string
 *       amount:
 *         type: number
 *       canister_id:
 *         type: string
 */ 

/**
 * @swagger
 * definitions:
 *   withDrawReq:
 *     properties:
 *       to_principal:
 *         type: string
 *       amount:
 *         type: number
 *       canister_id:
 *         type: string
 */ 

/**
 * @swagger
 * definitions:
 *   withDrawFakeReq:
 *     properties:
 *       to_principal:
 *         type: string
 *       amount:
 *         type: number
 *       canister_id:
 *         type: string
 */ 
/**
 * @swagger
 * /account/queryBlock:
 *  post:
 *    tags:
 *      - account
 *    summary: query infomatio of the specific block height
 *    description: query infomatio of the specific block height
 *    requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/queryBlockReq'
 *    responses:
 *      200:
 *        description: return the data
 */
router.post("/queryBlock", accountController.query_block_controller);
/**
 * @swagger
 * /account/queryBlockFake:
 *  post:
 *    tags:
 *      - account
 *    summary: query infomatio of the specific block height
 *    description: query infomatio of the specific block height
 *    requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/queryBlockFakeReq'
 *    responses:
 *      200:
 *        description: return the data
 */
router.post("/queryBlockFake", accountController.query_block_ledger_controller);


/**
 * @swagger
 * /account/queryNewestBlock:
 *  post:
 *    tags:
 *      - account
 *    summary: query infomatio of the specific block height
 *    description: query infomatio of the specific block height
 *    requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/queryNewestBlockReq'
 *    responses:
 *      200:
 *        description: return the newest block index
 */
router.post("/queryNewestBlock", accountController.queryNewestBlockIndexController);
/**
 * @swagger
 * /account/queryFakeNewestBlock:
 *  post:
 *    tags:
 *      - account
 *    summary: query fake infomatio of the specific block height
 *    description: query fake infomatio of the specific block height
 *    responses:
 *      200:
 *        description: return the data
 */
router.post("/queryFakeNewestBlock", accountController.queryFakeNewestBlockIndexController);




/**
 * @swagger
 * /account/scanBlock:
 *  post:
 *    tags:
 *      - account
 *    summary: query infomatio of the specific block height
 *    description: query infomatio of the specific block height
 *    requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/scanBlockReq'
 *    responses:
 *      200:
 *        description: return the data
 */
router.post("/scanBlock", accountController.scanBlockController);


/**
 * @swagger
 * /account/tokenBalance:
 *  post:
 *    tags:
 *      - account
 *    summary: query token balance of current ICP address
 *    description: query token balance of current ICP address
 *    requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/tokenBalanceReq'
 *    responses:
 *      200:
 *        description: return ICP balance of current address
 */
router.post("/tokenBalance", accountController.account_balance_controller);
/**
 * @swagger
 * /account/tokenBalanceFake:
 *  post:
 *    tags:
 *      - account
 *    summary: query fake token balance of current ICP address
 *    description: query fake token balance of current ICP address
 *    requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/tokenBalanceFakeReq'
 *    responses:
 *      200:
 *        description: return ICP balance of current address
 */
router.post("/tokenBalanceFake", accountController.account_balance_controller_fake);


/**
 * @swagger
 * /account/getPid:
 *  get:
 *    tags:
 *      - account
 *    summary: get ICP address through generated principal id
 *    description: get ICP address through generated principal id
 *    responses:
 *      200:
 *        description: return new ICP address
 */
router.get("/getPid", accountController.get_pid_controller);
// /**
//  * @swagger
//  * /account/queryMemonic:
//  *  post:
//  *    tags:
//  *      - account
//  *    summary: query memnoic from principal id.
//  *    description: query memnoic from principal id.
//  *    requestBody:
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/definitions/queryMemnicReq'
//  *    responses:
//  *      200:
//  *        description: return block height
//  */
// router.post("/queryMemonic", accountController.query_memonic_controller);
/**
 * @swagger
 * /account/refund:
 *  post:
 *    tags:
 *      - account
 *    summary: user refund icp to shiku account.
 *    description: user refund icp to shiku account.
 *    requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/RefundReq'
 *    responses:
 *      200:
 *        description: return block height
 */
router.post("/refund", accountController.refund_controller);

/**
 * @swagger
 * /account/refundFake:
 *  post:
 *    tags:
 *      - account
 *    summary: user refund fake icp to shiku account.
 *    description: user refund fake icp to shiku account.
 *    requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/RefundFakeReq'
 *    responses:
 *      200:
 *        description: return block height
 */
router.post("/refundFake", accountController.refund_controller_fake);

/**
 * @swagger
 * /account/withdraw:
 *  post:
 *    tags:
 *      - account
 *    summary: shiku account withdraw icp to user.
 *    description: shiku account withdraw icp to user.
 *    requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/withDrawReq'
 *    responses:
 *      200:
 *        description: return block height
 */
router.post("/withdraw", accountController.withdraw_controller);

/**
 * @swagger
 * /account/withdrawFake:
 *  post:
 *    tags:
 *      - account
 *    summary: shiku account withdraw fake icp to user.
 *    description: shiku account withdraw fake icp to user.
 *    requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/withDrawFakeReq'
 *    responses:
 *      200:
 *        description: return block height
 */
router.post("/withdrawFake", accountController.withdraw_controller_fake);

export default router;