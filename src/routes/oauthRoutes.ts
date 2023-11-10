import express from "express";
import * as getTwitterUserProfileController from "../controller/oauthController";

const router = express.Router();
/**
 * @swagger
 * definitions:
 *   oauthReq:
 *     properties:
 *       username:
 *         type: string
 */ 
/**
 * @swagger
 * /twitter/oauth:
 *  post:
 *    tags:
 *      - twitter
 *    summary: query infomatio of the specific block height
 *    description: query infomatio of the specific block height
 *    requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/oauthReq'
 *    responses:
 *      200:
 *        description: return the data
 */
router.post("/oauth", getTwitterUserProfileController.twitter);

export default router