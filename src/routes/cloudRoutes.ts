import express from "express";
import * as cloudController from "../controller/cloudController";

const router = express.Router();
/**
 * @swagger
 * definitions:
 *   downLoadReq:
 *     properties:
 *       url:
 *         type: string
 */ 
/**
 * @swagger
 * definitions:
 *   uploadFileReq:
 *     properties:
 *       filename:
 *         type: string
 */ 
/**
 * @swagger
 * definitions:
 *   generateUrlReq:
 *     properties:
 *       filename:
 *         type: string
 */ 

/**
 * @swagger
 * /cloud/downloadImage:
 *  post:
 *    tags:
 *      - cloud
 *    summary: query token balance of current ICP address
 *    description: query token balance of current ICP address
 *    requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/downLoadReq'
 *    responses:
 *      200:
 *        description: return ICP balance of current address
 */
router.post("/downloadImage", cloudController.downloadImageController);

/**
 * @swagger
 * /cloud/uploadFile:
 *  post:
 *    tags:
 *      - cloud
 *    summary: query token balance of current ICP address
 *    description: query token balance of current ICP address
 *    requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/uploadFileReq'
 *    responses:
 *      200:
 *        description: return ICP balance of current address
 */
router.post("/uploadFile", cloudController.upload_file_controller);

/**
 * @swagger
 * /cloud/generateUrl:
 *  post:
 *    tags:
 *      - cloud
 *    summary: query token balance of current ICP address
 *    description: query token balance of current ICP address
 *    requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/generateUrlReq'
 *    responses:
 *      200:
 *        description: return ICP balance of current address
 */
router.post("/generateUrl", cloudController.generate_url_controller);
export default router;