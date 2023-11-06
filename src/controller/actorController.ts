import fetch from 'cross-fetch';
import { idlFactory  } from "../did/ledger.did";
import { idlFactory as BlockidlFactory} from "../did/block_index.did";
import { idlFactory as blockTestIdlFactory } from '../did/block_index_test.did';
import { idlFactory as fakeIdlFactory } from '../did/fake_icp_ledger.did';
import { idlFactory as yumiidlFactory} from "../did/yumi.did";
import { idlFactory as ercidlFactory} from "../did/erc721.did";
import { idlFactory as yumionlineFactory } from "../did/yumi_online.did";
import { idlFactory as newRecordidlFactory} from "../did/record.did";
import { idlFactory as oldRecordidlFactory } from "../did/old_record.did";
import { idlFactory as oatidlFactory } from "../did/oat.did";
import { idlFactory as artistFactory } from "../did/artist.did";
import { idlFactory as shikuidlFactory} from "../did/ext_based_721_backend.did";
import { landsIdlFactory  } from '../did/lands.did';
import { idlFacroty as autionIdlFactory } from "../did/aution.did";
import { idlFactory as shikuTestTokenFactory } from '../did/shikuTestToken.did';
import { idlFactory as shikuTestTokenBlockIndexFactory } from '../did/ShikuSTTBlockIndex.did';
import { idlFactory as shikuCanvasNftIdlFactory } from '../did/shikuCanvasNft.did';
import { idlFactory as shikuCoCreateNftIdlFactory } from '../did/cocreate_nft.did';
import { idlFactory as factoryIdlFactory } from '../did/factory.did';
import { idlFactory as extIdlFactory } from '../did/ext.did';

import { 
    mnemonicWord,
    ppe,
    boe,
    online
} from "../utils/config";
import { 
    getIdentityFromSeed, 
 } from "../utils/identity";
import { Actor, HttpAgent} from '@dfinity/agent';

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

// get fake ledger actor
export const createLedgerActorFake = async (phase: any, canisterId: any) => {
    // set fake ledger canister id
    // let canisterId =boe.ledger;   
    // get fake ledger actor from canister id and phase 
    const actor = await build_actor(canisterId, phase, fakeIdlFactory);
    return actor;
}

// get block index actor
export const createBlockIndexActorFake = async (phase: any) => {
    // set block index canister id
    let canisterId =boe.blockIndex;    
    // get block index actor from canister id, phase, and idl factory.
    const actor = await build_actor(canisterId, phase, blockTestIdlFactory)
    return actor;
}

// get block actor
export const createBlockActor = async () => {
    // set block canister id
    let canisterId = ppe.blockIndex; 
    // set block actor phase
    const phase = mnemonicWord.yumengAccount;
    // get block actor from canister id, phase, and block idl factory
    const actor = await build_actor(canisterId, phase, BlockidlFactory);
    return actor; 
}



export const createYumiErc721Actor = async (cid: string) => {
    let canisterId = cid;
    const phase = mnemonicWord.yumengAccount;
    const actor = await build_actor(canisterId, phase, ercidlFactory)
    return actor; 
}

export const createYumiActor = async (canisterId: any) => {
    // let canisterId =boe.yumi;
    let phase = mnemonicWord.yumengAccount;
    const actor = await build_actor(canisterId, phase, yumiidlFactory)
    return actor;
}

export const createYumiOnlineActor = async (canisterId: any) => {
    // let canisterId =online.yumi;
    let phase = mnemonicWord.yumengAccount;
    const actor = await build_actor(canisterId, phase, yumionlineFactory)
    return actor;
}

export const createERC721Actor = async () => {
    let canisterId ='b4gky-naaaa-aaaah-abzrq-cai';
    const phase = mnemonicWord.yumengAccount;
    const actor = await build_actor(canisterId, phase, ercidlFactory)
    return actor;
}

export const createRecordActor = async () => {
    let canisterId = online.newRecord;
    const phase = mnemonicWord.yumengAccount;
    const actor = await build_actor(canisterId, phase, newRecordidlFactory)
    return actor;
}

export const createPrincipalRecordActor = async () => {
    let canisterId = online.oldRecord;
    const phase = mnemonicWord.yumengAccount;
    const actor = await build_actor(canisterId, phase, oldRecordidlFactory)
    return actor;
}

export const createOatActor = async () => {
    let canisterId = online.oat;
    const phase = mnemonicWord.yumengAccount;
    const actor = await build_actor(canisterId, phase, oatidlFactory)
    return actor;
}

export const createArtistActor = async () => {
    let canisterId = online.artist;
    const phase = mnemonicWord.yumengAccount;
    const actor = await build_actor(canisterId, phase, artistFactory)
    return actor;
}

export const createShikuActor = async (phase: any, canister_id: any) => {
    // let canisterId =online.shiku_nft;
    const actor = await build_actor(canister_id, phase, shikuidlFactory)
    return actor;
}

export const createLandsActor = async () => {
    let canisterId =online.shiku_lands_prod;
    const phase = mnemonicWord.yumengAccount;
    const actor = await build_actor(canisterId, phase, landsIdlFactory)
    return actor;
}

export const createYumiAutioinActor = async () => {
    let canisterId =online.yumi;    
    const phase = mnemonicWord.yumengAccount;
    const actor = await build_actor(canisterId, phase, autionIdlFactory)
    return actor;
}

export const createShikuTestTokenActor = async (cid: any) => {
    const phase = mnemonicWord.yumengAccount;
    const actor = await build_actor(cid, phase, shikuTestTokenFactory);
    return actor;
}

export const createShikuTestTokenBlockIndexActor = async () => {
    const phase = mnemonicWord.yumengAccount;
    const cid = boe.shikuTestTokenBlock
    const actor = await build_actor(cid, phase, shikuTestTokenBlockIndexFactory);
    return actor;
}

export const createShikuCanvasNftContoller = async (cid: any) => {
    const phase = mnemonicWord.yumengAccount;
    const actor = await build_actor(cid, phase, shikuCanvasNftIdlFactory);
    return actor;    
}

export const createShikuCoCreateNftController = async (cid: any) => {
    const phase = mnemonicWord.yumengAccount;
    const actor = await build_actor(cid, phase, shikuCoCreateNftIdlFactory);
    return actor;
}

export const createExtNftController = async (cid: any) => {
    const phase = mnemonicWord.yumengAccount;
    const actor = await build_actor(cid, phase, extIdlFactory);
    return actor;
}

export const createFactoryController = async (cid: any) => {
    const phase = mnemonicWord.yumengAccount;
    const actor = await build_actor(cid, phase, factoryIdlFactory);
    return actor;
}