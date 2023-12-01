import express from "express";
import * as homepageController from "../controllers/homepageController";

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

/**
 * @swagger
 * /homepage/getAllQuestionList:
 *  get:
 *    tags:
 *      - homepage
 *    summary: get all question
 *    description: ask new question
 *    responses:
 *      200:
 *        description: return the data
 */
router.get("/getAllQuestionList", homepageController.get_all_question_list_controller);

/**
 * @swagger
 * /homepage/getAllQuestionIdList:
 *  get:
 *    tags:
 *      - homepage
 *    summary: get all question id list
 *    description: ask new question list
 *    responses:
 *      200:
 *        description: return the data
 */
router.get("/getAllQuestionIdList", homepageController.get_all_question_id_list_controller);


/**
 * @swagger
 * definitions:
 *   viewByPageReq:
 *     properties:
 *       page:
 *         type: number
 *       limit:
 *         type: number
 *       sort:
 *         type: number
 * 
 */ 

/**
 * @swagger
 * /homepage/viewByPage:
 *  post:
 *    tags:
 *      - homepage
 *    summary: view by page
 *    description: view by page
 *    requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/viewByPageReq'
 *    responses:
 *      200:
 *        description: return the data
 */
router.post("/viewByPage", homepageController.view_by_page_controller);

/**
 * @swagger
 * definitions:
 *   upVoteReq:
 *     properties:
 *       question_id:
 *         type: string
 */ 

/**
 * @swagger
 * /homepage/upVote:
 *  post:
 *    tags:
 *      - homepage
 *    summary: up vote
 *    description: up vote
 *    requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/upVoteReq'
 *    responses:
 *      200:
 *        description: return the data
 */
router.post("/upVote", homepageController.up_vote_controller);

/**
 * @swagger
 * definitions:
 *   downVoteReq:
 *     properties:
 *       question_id:
 *         type: string
 */ 

/**
 * @swagger
 * /homepage/downVote:
 *  post:
 *    tags:
 *      - homepage
 *    summary: up vote
 *    description: up vote
 *    requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/downVoteReq'
 *    responses:
 *      200:
 *        description: return the data
 */
router.post("/downVote", homepageController.down_vote_controller);


export default router;