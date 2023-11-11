import { Principal } from '@dfinity/principal';
import {
    createUserActor
} from "./actorController";

export async function add_new_answer_controller(req: any, res: any, next: any) {
    try {
        const question_params = {
            question_id: req.body.question_id,
            answer_pid: Principal.fromText(req.body.answer_pid),
            answer_content: req.body.answer_content,
        }
        createUserActor().then((actor: any) => {
            actor.add_new_answer(question_params).then((result: any) => {
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

export async function get_all_answers_list_by_question_id_controller(req: any, res: any, next: any) {
    try {
        const question_params = {
            question_id: req.body.question_id,
        }
        createUserActor().then((actor: any) => {
            actor.get_all_answers_list_by_question_id(question_params).then((result: any) => {
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

