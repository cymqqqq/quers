import { 
    createShikuActor,
    createShikuCanvasNftContoller,
    createShikuCoCreateNftController
 } from "./actorController";

 export const shiku_update_cocreate_token_status = async(req: any, res: any, next: any) => {
    let token: any;
    let co_actor: any
    try {
        co_actor = await createShikuCoCreateNftController(req.body.canister)
        await co_actor.update_cocreate_token_status(parseInt(req.body.token_id))
        res.status(201).json({
            result: "success"
        })

    } catch (e) {
        console.log("error ", e)
        res.json({

        })
    }
 }