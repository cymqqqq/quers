import express from "express";
import * as UserController from "../controller/userController";

const router = express.Router();
/**
 * @swagger
 * definitions:
 *   getUserProfileReq:
 *     properties:
 *       owner:
 *         type: string
 */ 

/**
 * @swagger
 * /user/getUserProfile:
 *  post:
 *    tags:
 *      - user
 *    summary: query infomatio of the specific block height
 *    description: query infomatio of the specific block height
 *    requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/getUserProfileReq'
 *    responses:
 *      200:
 *        description: return the data
 */
router.post("/getUserProfile", UserController.get_user_profile_controller);

export default router