import fetch from 'cross-fetch';
import { idlFactory  } from "../did/ledger.did";
import { idlFactory as BlockidlFactory} from "../did/block_index.did";
import { idlFactory as userFactory} from "../did/user.did";


import { 
    mnemonicWord,
    ppe,
    boe,
} from "../utils/config";
import { 
    getIdentityFromSeed, 
 } from "../utils/identity";
import { Actor, HttpAgent} from '@dfinity/agent';
const user = "g5fwl-3aaaa-aaaah-adtlq-cai"
// generate agent to communicate with ic network
export const getAgent = async (identity: any) => {
    // ic host
    let host2 = "https://ic0.app";
    // get agent
    let agent = new HttpAgent({
        fetch,
        host: host2,
       identity: identity,
    });
    return agent;
}

// build actor
const build_actor = async (cid: any, phase: any, idlFactory: any) => {
    // get identity from phase
    const identity = await getIdentityFromSeed(phase);
    // get agent from identity
    let agent = await getAgent(identity);
    // get actor
    const actor = Actor.createActor(idlFactory, {
        agent,
        canisterId: cid,
    });
    return actor;
}

// create ledger actor
    export const createLedgerActor = async (phase: any, canisterId: any) => {
    // set ledger cansiter id
    // let canisterId =ppe.ledger;    
    // get ledger actor from canister id and phase.
    const actor = await build_actor(canisterId, phase, idlFactory);
    return actor;
}



// // get block actor
export const createBlockActor = async () => {
    // set block canister id
    let canisterId = ""
    // ppe.blockIndex; 
    // set block actor phase
    const phase = mnemonicWord.yumengAccount;
    // get block actor from canister id, phase, and block idl factory
    const actor = await build_actor(canisterId, phase, BlockidlFactory);
    return actor; 
}

export const createUserActor = async () => {
    const phase = mnemonicWord.yumengAccount;
    const actor = await build_actor(user,phase, userFactory)
    // console.log(actor)
    return actor
}






