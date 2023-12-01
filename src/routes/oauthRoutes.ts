import express from "express";
import * as getTwitterUserProfileController from "../controllers/oauthController";

const router = express.Router();
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

/**
 * @swagger
 * /twitter/user:
 *  get:
 *    tags:
 *      - twitter
 *    summary: query user profile
 *    description:  query user profile
 *    responses:
 *      200:
 *        description: return the data
 */
router.get("/user", getTwitterUserProfileController.get_user);


export default router