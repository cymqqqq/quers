import express from "express";
import * as UserController from "../controllers/userController";

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


/**
 * @swagger
 * definitions:
 *   updateUserHoldersReq:
 *     properties:
 *       owner:
 *         type: string
 *       holders:
 *         type: string
 */ 

/**
 * @swagger
 * /user/updateUserHolders:
 *  post:
 *    tags:
 *      - user
 *    summary: update user holders
 *    description: update user holders
 *    requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/updateUserHoldersReq'
 *    responses:
 *      200:
 *        description: return the data
 */
router.post("/updateUserHolders", UserController.update_user_holders_controller);

/**
 * @swagger
 * definitions:
 *   updateUserTvlReq:
 *     properties:
 *       owner:
 *         type: string
 *       tvl:
 *         type: string
 */ 

/**
 * @swagger
 * /user/updateUserTvl:
 *  post:
 *    tags:
 *      - user
 *    summary: update user tvl
 *    description: update user tvl
 *    requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/updateUserTvlReq'
 *    responses:
 *      200:
 *        description: return the data
 */
router.post("/updateUserTvl", UserController.update_user_tvl_controller);


/**
 * @swagger
 * definitions:
 *   updateUserPrincipalReq:
 *     properties:
 *       principal:
 *         type: string
 */ 

/**
 * @swagger
 * /user/updateUserPrincipal:
 *  post:
 *    tags:
 *      - user
 *    summary: update user principal
 *    description: update user principal
 *    requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/updateUserPrincipalReq'
 *    responses:
 *      200:
 *        description: return the data
 */
router.post("/updateUserPrincipal", UserController.set_user_principal);


/**
 * @swagger
 * definitions:
 *   updateUserNameReq:
 *     properties:
 *       owner:
 *         type: string
 *       username:
 *         type: string
 */ 

/**
 * @swagger
 * /user/updateUserName:
 *  post:
 *    tags:
 *      - user
 *    summary: update user principal
 *    description: update user principal
 *    requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/updateUserNameReq'
 *    responses:
 *      200:
 *        description: return the data
 */
router.post("/updateUserName", UserController.update_username);


/**
 * @swagger
 * definitions:
 *   updateNameReq:
 *     properties:
 *       owner:
 *         type: string
 *       name:
 *         type: string
 */ 

/**
 * @swagger
 * /user/updateName:
 *  post:
 *    tags:
 *      - user
 *    summary: update name
 *    description: update name
 *    requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/updateNameReq'
 *    responses:
 *      200:
 *        description: return the data
 */
router.post("/updateName", UserController.update_name);

/**
 * @swagger
 * definitions:
 *   getUserFollowersReq:
 *     properties:
 *       owner:
 *         type: string
 */ 

/**
 * @swagger
 * /user/getUserFollowers:
 *  post:
 *    tags:
 *      - user
 *    summary: get user followers
 *    description: get user followers
 *    requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/getUserFollowersReq'
 *    responses:
 *      200:
 *        description: return the data
 */
router.post("/getUserFollowers", UserController.get_user_followers);

/**
 * @swagger
 * definitions:
 *   getUserFollowingReq:
 *     properties:
 *       owner:
 *         type: string
 */ 

/**
 * @swagger
 * /user/getUserFollowing:
 *  post:
 *    tags:
 *      - user
 *    summary: get user followers
 *    description: get user followers
 *    requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/getUserFollowingReq'
 *    responses:
 *      200:
 *        description: return the data
 */
router.post("/getUserFollowing", UserController.get_user_following);



export default router