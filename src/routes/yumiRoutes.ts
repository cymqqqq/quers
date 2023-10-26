import express from "express";
import * as yumiController from "../controller/yumiController";
import * as yumiAutionController from "../controller/yumiAutionController";

const router = express.Router();
/**
 * @swagger
 * definitions:
 *   getYumiAutionReq:
 *     properties:
 *       token_id:
 *         type: number
*/ 


/**
 * @swagger
 * definitions:
 *   YumiSellDutchAutionReq:
 *     properties:
 *       canister:
 *         type: string
 *       index:
 *         type: string
 *       reduce_time:
 *         type: string
 *       start_price:
 *         type: string
 *       floor_price:
 *         type: string
 *       reduce_price:
 *         type: string
 *       end_time:
 *         type: string
 * 
*/ 
/**
 * @swagger
 * definitions:
 *   YumiCompressImgReq:
 *     properties:
 *       filepath:
 *         type: string
 *       filename:
 *         type: string
 *       new_filename:
 *         type: string
*/ 
/**
 * @swagger
 * /buyNowTest:
 *  post:
 *    tags:
 *      - buyNowTest
 *    summary: buy now on yumi testnet.
 *    description: buy now on yumi testnet.
 *    responses:
 *      200:
 *        description: return ok
 */
// router.post("/buyNowTest", yumiController.buynowtest_controller);
/**
 * @swagger
 * /buyNow:
 *  post:
 *    tags:
 *      - buyNow
 *    summary: buy now on yumi mainnet.
 *    description: buy now on yumi mainnet.
 *    responses:
 *      200:
 *        description: return ok
 */
router.post("/buyNow", yumiController.buynow_controller);


/**
 * @swagger
 * /yumi/getYumiAution:
 *  post:
 *    tags:
 *      - yumi
 *    summary: get shiku land aution on Yumi.
 *    description: get shiku land aution on Yumi.
 *    requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/getYumiAutionReq'
 *    responses:
 *      200:
 *        description: return nft json data
 */
router.post("/getYumiAution", yumiAutionController.get_aution_controller);
/**
 * @swagger
 * /yumi/YumiCompressImg:
 *  post:
 *    tags:
 *      - yumi
 *    summary: compress image for Yumi.
 *    description: compress image for Yumi.
 *    requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/YumiCompressImgReq'
 *    responses:
 *      200:
 *        description: return nft json data
 */
router.post("/YumiCompressImg", yumiController.compressImgYumi_controller);

/**
 * @swagger
 * /yumi/YumiDutchAution:
 *  post:
 *    tags:
 *      - yumi
 *    summary: sell dutch aution.
 *    description: sell dutch aution.
 *    requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/YumiSellDutchAutionReq'
 *    responses:
 *      200:
 *        description: return nft json data
 */
router.post("/YumiDutchAution", yumiController.sell_dutchaution_controller);

export default router;