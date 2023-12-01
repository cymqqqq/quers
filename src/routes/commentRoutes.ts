import express from "express";
import * as commentController from "../controllers/commentController";

const router = express.Router();
/**
 * @swagger
 * definitions:
 *   addNewCommentReq:
 *     properties:
 *       question_id:
 *         type: string
 *       answer_pid:
 *         type: string
 *       comment_pid:
 *         type: string
 *       comment_content:
 *         type: string
 */ 

/**
 * @swagger
 * /comment/addNewComment:
 *  post:
 *    tags:
 *      - comment
 *    summary: add new comment
 *    description: add new comment
 *    requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/addNewCommentReq'
 *    responses:
 *      200:
 *        description: return the data
 */
router.post("/addNewComment", commentController.add_new_comment_controller);

/**
 * @swagger
 * definitions:
 *   getAllCommentListReq:
 *     properties:
 *       answer_pid:
 *         type: string
 */ 


/**
 * @swagger
 * /comment/getAllCommentList:
 *  post:
 *    tags:
 *      - comment
 *    summary: get all comments
 *    description: get all comments
 *    requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/getAllCommentListReq'
 *    responses:
 *      200:
 *        description: return the data
 */
router.post("/getAllCommentList", commentController.get_all_comment_list_by_answer_pid_controller);

export default router;