import { Principal } from '@dfinity/principal';
import { generateMnemonic } from "bip39";
import {
    mnemonicWord
} from "../utils/config";
import {
    fromHexString,
    getAccountId,
    to32bits,
} from "../utils/crypto";
import {
    getIdentityFromSeed,
} from "../utils/identity";
import {
    createUserActor
} from "./actorController";

export async function get_user_profile_controller(req: any, res: any, next: any) {
    try {
        createUserActor().then((actor: any) => {
            actor.get_user_profile({owner: Principal.fromText(req.body.owner)}).then((result: any) => {
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