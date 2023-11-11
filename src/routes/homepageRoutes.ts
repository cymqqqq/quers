import express from "express";
import * as homepageController from "../controller/homepageController";

const router = express.Router();
/**
 * @swagger
 * definitions:
 *   askNewQuestionReq:
 *     properties:
 *       question_title:
 *         type: string
 *       question_asker:
 *         type: string
 *       question_logo:
 *         type: any
 *       question_description:
 *         type: string
 *       tags:
 *         type: any
 *       question_image:
 *         type: string
 */ 

/**
 * @swagger
 * /homepage/askNewQuestion:
 *  post:
 *    tags:
 *      - homepage
 *    summary: ask new question
 *    description: ask new question
 *    requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/askNewQuestionReq'
 *    responses:
 *      200:
 *        description: return the data
 */
router.post("/askNewQuestion", homepageController.ask_new_question_controller);

// *    requestBody:
// *       content:
// *         application/json:
// *           schema:
// *             $ref: '#/definitions/getAllQuestionListReq'

/**
 * @swagger
 * /homepage/getAllQuestionList:
 *  post:
 *    tags:
 *      - homepage
 *    summary: get all question
 *    description: ask new question
 *    responses:
 *      200:
 *        description: return the data
 */
router.post("/getAllQuestionList", homepageController.get_all_question_list_controller);

export default router;