import express from "express";
import * as getTwitterUserProfileController from "../controller/oauthController";

const router = express.Router();
// /**
//  * @swagger
//  * definitions:
//  *   oauthReq:
//  *     properties:
//  *       username:
//  *         type: string
//  */ 
/**
 * @swagger
 * /twitter/oauth:
 *  get:
 *    tags:
 *      - twitter
 *    summary: query infomatio of the specific block height
 *    description: query infomatio of the specific block height
 *    responses:
 *      200:
 *        description: return the data
 */
router.get("/oauth", getTwitterUserProfileController.twitter);

// *    requestBody:
// *       content:
// *         application/json:
// *           schema:
// *             $ref: '#/definitions/oauthReq'

// /**
//  * @swagger
//  * definitions:
//  *   oauthCallbackReq:
//  *     properties:
//  *       query:
//  *         type: any
//  *       session:
//  *         type: any
//  */ 

/**
 * @swagger
 * /twitter/callback:
 *  get:
 *    tags:
 *      - twitter
 *    summary: query infomatio of the specific block height
 *    description: query infomatio of the specific block height
 *    responses:
 *      200:
 *        description: return the data
 */
router.get("/callback", getTwitterUserProfileController.callback);
// *    requestBody:
// *       content:
// *         application/json:
// *           schema:
// *             $ref: '#/definitions/oauthCallbackReq'

export default router