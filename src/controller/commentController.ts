import { Principal } from '@dfinity/principal';
import {
    createUserActor
} from "./actorController";

export async function add_new_comment_controller(req: any, res: any, next: any) {
    try {
        const params = {
            question_id: req.body.question_id,
            answer_pid: Principal.fromText(req.body.answer_pid),
            comment_pid: Principal.fromText(req.body.comment_pid),
            comment_content: req.body.comment_content,
        }
        createUserActor().then((actor: any) => {
            actor.add_new_comment(params).then((result: any) => {
                console.log("result ", result)
                res.json({
                    code: 20000,
                    data: result,
                })
            })
        })
    } catch (e) {
        console.log("error ", e)
        res.json({
            result: e
        })
    }
}

export async function get_all_comment_list_by_answer_pid_controller(req: any, res: any, next: any) {
    try {
        const params = {
            answer_pid: Principal.fromText(req.body.answer_pid),
        }
        createUserActor().then((actor: any) => {
            actor.get_all_comment_list(params).then((result: any) => {
                console.log("result ", result.Success)
                res.json({
                    code: 20000,
                    data: result.Success,
                })
            })
        })
    } catch (e) {
        console.log("error ", e)
        res.json({
            result: e
        })
    }
}

