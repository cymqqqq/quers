import express from "express";
import * as answerController from "../controllers/answerController";

const router = express.Router();
/**
 * @swagger
 * definitions:
 *   addNewAnswerReq:
 *     properties:
 *       question_id:
 *         type: string
 *       answer_pid:
 *         type: string
 *       answer_content:
 *         type: string
 */ 

/**
 * @swagger
 * /answer/addNewAnswer:
 *  post:
 *    tags:
 *      - answer
 *    summary: ask new question
 *    description: ask new question
 *    requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/addNewAnswerReq'
 *    responses:
 *      200:
 *        description: return the data
 */
router.post("/addNewAnswer", answerController.add_new_answer_controller);

/**
 * @swagger
 * definitions:
 *   getAllAnswerListReq:
 *     properties:
 *       question_id:
 *         type: string
 */ 


/**
 * @swagger
 * /answer/getAllAnswerList:
 *  post:
 *    tags:
 *      - answer
 *    summary: get all question
 *    description: ask new question
 *    requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/getAllAnswerListReq'
 *    responses:
 *      200:
 *        description: return the data
 */
router.post("/getAllAnswerList", answerController.get_all_answers_list_by_question_id_controller);

export default router;