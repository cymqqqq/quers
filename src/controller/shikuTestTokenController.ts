import { boe } from "../utils/config";
import { createShikuTestTokenActor } from "./actorController";
import { Principal } from "@dfinity/principal";


export const stt_metadata_controller = async (req: any, res: any, next: any) => {
    let name_json: any;
    let symbol_json: any;
    let stt_actor: any;
    let meta_json: any;
    try {
        stt_actor = await createShikuTestTokenActor(req.body.canister_id);
        
        name_json = await stt_actor.icrc1_name();
        symbol_json = await stt_actor.icrc1_symbol();
        console.log(name_json)
        console.log(symbol_json)
        meta_json = {
            "icrc1_name": name_json,
            "icrc1_symbol": symbol_json
        }
        res.status(201).json({
            result: meta_json,
        })
    } catch (e) {
        console.log("error ", e)
        res.json({

        })
    }
    
}

export const stt_transfer_controller = async (req: any, res: any, next: any) => {
    let transfer_res: any;
    let stt_actor: any;
    let pid: any;
    let amount: any;
    let canister_id: any
    try {
        stt_actor = await createShikuTestTokenActor(req.body.canister_id);
        pid = Principal.fromText(req.body.pid);
        let to: any = {
            owner: pid,
            subaccount: [],
        };
        amount = req.body.amount;
        let obj: any = {
            to: to,
            amount: parseInt(amount),
            fee: [],
            memo: [],
            from_subaccount: [],
            created_at_time: [],
        }
        transfer_res = await stt_actor.icrc1_transfer(obj);
        console.log(transfer_res)
        res.status(201).json({
            result: JSON.parse(transfer_res.Ok),
        })
    } catch (e) {
        console.log("error ", e)
        res.json({

        })
    }
}
export const stt_get_transactions = async (req: any, res: any, next: any) => {
    let transaction_res: any;
    let stt_actor: any;
    let start: any;
    let length: any;
    try {
        stt_actor = await createShikuTestTokenActor(req.body.canister_id);
        start = req.body.start;
        length = req.body.length;
        let obj: any = {
            start: parseInt(start),
            length: parseInt(length),
        }
        transaction_res = await stt_actor.get_transactions(obj);
        console.log(transaction_res.transactions[0].mint[0])
        res.status(201).json({
            result: transaction_res,
        })
    } catch (e) {
        console.log("error ", e)
        res.json({

        })
    }
}

