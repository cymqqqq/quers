
import { Identity, Actor, HttpAgent} from '@dfinity/agent';
import { getIdentityFromSeed } from "../utils/identity";
import fetch from 'cross-fetch';
import { Principal } from "@dfinity/principal";
// @ts-ignore

import { idlFactory as oracleidlFactory } from "../did/oracle.did";
import { online, mnemonicWord } from "../utils/config";

export const createOracleActor = async () => {
    let host2 = "https://ic0.app";
    let canisterId =online.oracle; 
    let identity1 = await getIdentityFromSeed(mnemonicWord.yumengAccount);
    let agent = new HttpAgent({
        fetch,
        host: host2,
       identity: identity1,
    });
    const actor = Actor.createActor(oracleidlFactory, {
        agent,
        canisterId: canisterId,
    });
    return actor;
}

export const getXdrPriceController = async (req: any, res: any, next: any) => {
    let oracle_actorr = await createOracleActor();
    let price = await oracle_actorr.get_exchange_rate(req.body.quote_asset, req.body.base_asset);
    console.log(price);
}