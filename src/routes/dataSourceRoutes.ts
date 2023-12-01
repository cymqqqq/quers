import express from "express";
import * as dataController from "../controllers/dataServiceController";

const router = express.Router();

/**
 * @swagger
 * /data/findAllUser:
 *  get:
 *    tags:
 *      - data
 *    summary: query user private
 *    description:  query user private
 *    responses:
 *      200:
 *        description: return the data
 */
router.get("/findAllUser", dataController.private_user_find_all_service);

/**
 * @swagger
 * /data/findAllUserProfile:
 *  get:
 *    tags:
 *      - data
 *    summary: query user profile
 *    description:  query user profile
 *    responses:
 *      200:
 *        description: return the data
 */
router.get("/findAllUserProfile", dataController.user_profile_data_find_all_service);

/**
 * @swagger
 * /data/delAllUserProfile:
 *  post:
 *    tags:
 *      - data
 *    summary: delete all user profile
 *    description:  delete all user profile
 *    responses:
 *      200:
 *        description: delete the data
 */
router.post("/delAllUserProfile", dataController.user_profile_data_del_service);

/**
 * @swagger
 * /data/delAllPrivateData:
 *  post:
 *    tags:
 *      - data
 *    summary: delete all user private data
 *    description:  delete all user private data
 *    responses:
 *      200:
 *        description: delete the data
 */
router.post("/delAllPrivateData", dataController.private_user_del_all_service);



/**
 * @swagger
 * /data/questionDel:
 *  get:
 *    tags:
 *      - data
 *    summary: delete all question data
 *    description:  delete all question data
 *    responses:
 *      200:
 *        description: delete the data
 */
router.get("/questionDel", dataController.question_del_service);


export default router