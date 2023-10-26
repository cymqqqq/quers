import { Principal } from '@dfinity/principal';
import { 
    getAccountId,
    to32bits,
    fromHexString,
 } from "../utils/crypto";

import {
    boe,
    ppe,
    online,
    IC_SCAN,
    
} from "../utils/config";
import {
    createFactoryController
} from "./actorController"
const SUB_ACCOUNT_ZERO = Buffer.alloc(32);

export const factory_mint_controller = async (req: any, res: any, next: any) => {
    try {
        let canister_name = req.body.canister_name 
        let canister_id = req.body.canister_id
        let image = req.body.image_url
        let name = req.body.name
        let principal = req.body.principal
        let token_id = req.body.token_id 
        let description = req.body.description
        let pid = Principal.fromText(principal)
        let to: any = {
            owner: pid,
            subaccount: [],
        };
        let args = {
            id: parseInt(token_id),
            to:to,
            name: name,
            canister_id: canister_id,
            image: image,
            canister_name: canister_name,
            description: [description],
        }
        let actor = await createFactoryController(ppe.factory)
        let mint_res: any
        mint_res = await actor.mint_proxy(args)
        console.log(mint_res)
        let response = mint_res.ok ? mint_res.ok : "token id is null"
        let res_json: any 
        if (canister_id == ppe.icrc7) {
            res_json = {
                'token_id': response.toString(),
                'ic_scan': IC_SCAN,
                'icrc7': ppe.icrc7,
            }
        } else {
            res_json = {
                'token_id': response.toString(),
                'ic_scan': IC_SCAN,
                'icrc7': ppe.avatar,
            }
        }
        
        res.status(201).json({
            result: res_json
        })

    } catch (e) {
        console.log("error ",e )
        res.json({
            result: e
        })
    }
}
