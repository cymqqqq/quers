import { Principal } from '@dfinity/principal';
import {
    createUserActor
} from "./actorController";
import { question_find_service_by_time } from './dataServiceController';

export async function ask_new_question_controller(req: any, res: any, next: any) {
    try {
        const question_params = {
            question_title: req.body.question_title,
            question_asker: Principal.fromText(req.body.question_asker),
            question_logo: [req.body.question_logo],
            question_description: req.body.question_description,
            tags: req.body.tags,
            question_image: [req.body.question_image],
        }
        createUserActor().then((actor: any) => {
            actor.add_new_question(question_params).then((result: any) => {
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


export async function get_all_question_id_list_controller(req: any, res: any, next: any) {
    try {
        const question_params = {
        }
        createUserActor().then((actor: any) => {
            actor.get_all_question_id_list(question_params).then((result: any) => {
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
export async function get_all_question_list_controller(req: any, res: any, next: any) {
    try {
        const question_params = {
        }
        createUserActor().then((actor: any) => {
            actor.get_all_question_list(question_params).then((result: any) => {
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


export async function view_by_page_controller(req: any, res: any, next: any) {
    try {
        const question_params = {
            sort: req.body.sort,
            page: req.body.page,
            limit: req.body.limit,
        }
        if (question_params.sort == 2) {
            question_find_service_by_time(question_params.page, question_params.limit).then((question: any) => {
                console.log(question)
                res.json({
                    code: 20000,
                    data: question
                })
            })
        } else {

        }

    } catch (e) {
        console.log("error ", e)
        res.json({
            result: e
        })
    }
}
