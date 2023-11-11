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
 *    summary: query user profile
 *    description: query user profile
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


/**
 * @swagger
 * definitions:
 *   updateUserProfileReq:
 *     properties:
 *       owner:
 *         type: string
 *       description:
 *         type: string
 */ 

/**
 * @swagger
 * /user/updateUserProfile:
 *  post:
 *    tags:
 *      - user
 *    summary: update user profile information
 *    description: update user profile information
 *    requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/updateUserProfileReq'
 *    responses:
 *      200:
 *        description: return the data
 */
router.post("/updateUserProfile", UserController.update_profile_description_controller);


/**
 * @swagger
 * definitions:
 *   updateUserFollowersReq:
 *     properties:
 *       owner:
 *         type: string
 *       followers:
 *         type: string
 */ 

/**
 * @swagger
 * /user/updateUserFollowers:
 *  post:
 *    tags:
 *      - user
 *    summary: update user followers
 *    description: update user followers
 *    requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/updateUserFollowersReq'
 *    responses:
 *      200:
 *        description: return the data
 */
router.post("/updateUserFollowers", UserController.update_user_followers_controller);

export default router