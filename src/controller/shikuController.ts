
let md5 = require("md5");
import { Principal } from "@dfinity/principal";
import { decodeMetaData } from "../utils/binary";
import { getIdentityFromSeed } from "../utils/identity";
import {
    createERC721Actor,
    createOatActor,
    createPrincipalRecordActor,
    createRecordActor,
    createShikuActor,
    createYumiErc721Actor,
    createYumiOnlineActor
} from './actorController';
import {
    list_collections,
    list_collections_online
} from "./yumiController";
// @ts-ignore
import { boe, mnemonicWord, online } from "../utils/config";

import {
    generateUrl,
    getImageAxios
} from "../utils/cloud_api";
import { getAccountId } from "../utils/crypto";

export const transfer = async (from: any, to: any, tid: any) => {
    const fromPid = {principal: Principal.fromText(from)};
    const toPid = {principal: Principal.fromText(to)};
    const params = {
        token: tid,
        from: fromPid,
        to: toPid,
        notify: false,
        memo: [] as string[],
        subaccount: [] as string[],
        amount: 1,
    };

    console.log(params.from.toString());
    const erc721actor = await createERC721Actor();
    const res = await erc721actor.transfer(params);
    return res;
    // console.log(res);
    // console.log("transfer done");
}

export const transfer_controller = async (req: any, res: any) => {
    let transfer_result = await transfer(req.body.from, req.body.to, req.body.tid);
    res.json({
        result: transfer_result
    })
}


export const shiku_transfer = async (from_phase: any, to: any, tid: any, canister_id: any) =>{
    // const fromPid = {principal: Principal.fromText(from_phase)};
    let token_str = await tokenIdentifier(online.shiku_nft, tid);
    let from_identity = await getIdentityFromSeed(from_phase);
    const fromPid = {principal: Principal.fromText(from_identity.getPrincipal().toString())};
    // console.log(from_identity.getPrincipal().toString())
    const toPid = {principal: Principal.fromText(to)};
    // console.log(toPid)
    // console.log(token_str);
    const params = {
        token: token_str,
        from: fromPid,
        to: toPid,
        notify: true,
        memo: [] as string[],
        subaccount: [] as string[],
        amount: 1,
    };

    let shiku_actor = await createShikuActor(from_phase, canister_id);
    // console.log(shiku_actor)
    let res: any = {};
    res = await shiku_actor.transfer(params);

    console.log(res);
    return res.ok.toString();
}

export const shiku_refund_controller = async (canister_id: any, token: any, to_principal: any) => {
    try {
        let from_phase: any;
        let nft: any;
        let owner_data: any;
        owner_data = await shiku_wallet_nft_data_owner_search_service(token);
        // console.log(owner_data)
        from_phase = await shiku_wallet_user_phase_find_service(owner_data); 
        console.log(from_phase);
        let refund_res = await shiku_transfer(from_phase, to_principal, token, canister_id);
        nft = {
            "pid": to_principal,
            "tokenid": token,
        }
        await shiku_wallet_nft_data_owner_create_service(nft);
        return refund_res
    } catch (e) {
        console.log("error ", e);
        
    }
    // console.log(refund_res);
}

export const getShikuNftMetaDataController = async (req: any, res: any, next: any) => {
    try {
        let metadata: any
        let canister: string
        let principal: any
        var req_proto = require("../protosServices")
        canister = req.body.canister
        principal = Principal.fromText(req.body.principal);
        let metadata_inst = new req_proto[canister]()

        metadata = await metadata_inst.execute(principal)
        res.status(201).json({
            result: metadata
        })

    } catch (e) {
        console.log("error ",e )
        res.json({

        })
    }
}

export const shiku_nft_mint_controller = async (req: any, res: any, next: any) => {
    let ledger: any;
    let mint_res: any;
    let params: any
    try {
        let logo = req.body.logo 
        let name = req.body.name
        let desc = req.body.description
        params = {
            logo: logo ? [logo]: [''],
            name: name ? [name]: [''],
            description: desc ? [desc]: [''],
        }
        ledger = new CanvasLedgerController();
        ledger.set_to_principal(req.body.to_principal);
        ledger.set_canister(req.body.canister_id);
        ledger.set_prop(params)
        mint_res = await ledger.build_shiku_nft_mint_controller();
        res.status(201).json({
            result: mint_res
        })
    } catch (e) {
        console.log("error ", e)
        res.json({

        })
    }
}



var protobufjs = require("protobufjs").Root;

export const shiku_cocreate_nft_mint_service_controller = async (req: any, res: any, next: any) => {
    try {
        let params: any
        let prop_params: any

        prop_params = {
            logo: req.body.logo || [],
            name: req.body.name || [],
            description: req.body.description || [],
        }
        params = {
            to: req.body.to_principal,
            prop: prop_params
        }
        var req_proto = require("../protosServices")
        var encoded_proto = require("../protos/shiku_cocreate_nft.json")
        var cocreate_nft_Proto = protobufjs.fromJSON(encoded_proto);
        let encoded_req = cocreate_nft_Proto.lookupType("GetMintReq")
        let encoded_buffer = encoded_req.encode(Buffer.from(JSON.stringify(req.body))).finish()
        let cocreate_mint_inst = new req_proto[req.body.canister_id]()
        let mint_result = await cocreate_mint_inst.decodeAndExecute(encoded_buffer)
        console.log(mint_result)
        res.status(201).json({
            result: mint_result
        })

    } catch (e) {
        console.log("error ", e)
        res.json({

        })
    }
}
export const shiku_nft_owner_tokenid_controller = async (req: any, res: any, next: any) => {
    let ledger: any;
    let query_res: any;
    const data_res: any[] = [];
    let data: any
    try {
        ledger = new CanvasLedgerController();
        ledger.set_to_principal(req.body.to_principal);
        ledger.set_canister(req.body.canister_id);
        query_res = await ledger.build_shiku_nft_owner_tokenid_controller();
        // console.log(query_res)
        data = query_res.Ok;
        console.log(data)
        console.log(data.length)
        for(var i =0; i < data.length; i++) {
            
            const elem = JSON.parse(data[i])
            // console.log(elem)
            data_res.push(elem)
        }
        res.status(201).json({
            result: data_res
        })
    } catch (e) {
        console.log("erro ",e)
        res.json({

        })
    }
}

export const shiku_nft_transfer_controller = async (req: any, res: any, next: any) => {
    let ledger: any;
    let transfer_res: any;
    try {
        ledger = new CanvasLedgerController();
        ledger.set_from_principal(req.body.from_principal);
        ledger.set_to_principal(req.body.to_principal);
        ledger.set_tokenid(req.body.tokenid)
        ledger.set_canister(req.body.canister_id);
        transfer_res = await ledger.build_shiku_nft_transfer_controller();
        console.log(transfer_res)
        res.status(201).json({
            result: "success"
        })
    } catch (e) {
        console.log("erro ",e)
        res.json({

        })
    }
}
// export const shiku_withdraw_controller = async (req: any, res: any, next: any) => {
export const shiku_withdraw_controller = async (to_principal: any, token: any, canister_id: any) => {

    try {
        let nft: any;
        let withdraw_res = await shiku_transfer(mnemonicWord.yumengAccount, to_principal, token, canister_id);
        nft = {
            "pid": to_principal,
            "tokenid": token,
        }
        await shiku_wallet_nft_data_owner_create_service(nft);
        return withdraw_res
    } catch (e) {
        console.log("error ", e)
        
    }
    // console.log(withdraw_res);
}

// export const metadata_controller = async (req: any, res: any) => {
//     let metadata_result = await metaData(req.params.pid);
//     res.json({
//         result: metadata_result
//     })
// }
const padding = Buffer.from('\x0Atid');

export const to32bits = (num: number) => {
    let b = new ArrayBuffer(4);
    new DataView(b).setUint32(0, num);
    return Array.from(new Uint8Array(b));
}

export const tokenIdentifier = async (principal: any, index: any) => {
    const array = new Uint8Array([...padding, ...Principal.fromText(principal).toUint8Array(), ...to32bits(index)])
    return Principal.fromUint8Array(array).toText()
} 

//get nft metadata bytearray
export const metadata = async (cid: any,  tid: any) => {
    // let token_id = await tokenIdentifier(cid, tid);
    let metadata_actor = await createYumiErc721Actor(cid);

    let result = await metadata_actor.metadata(tid);
 
    return result;
}
//decode nft metadata
export const getNFTMetadata = async (metadata: any) => {
    let res = metadata; 
    let blindData = [];
    for (let i = 0; i < res.length; i++) {
        let metaJson = await decodeMetaData(res[i]);
        blindData.push(metaJson);
    }

    return blindData;
}
//collection data
export const getCollectionData = async (cid: any) => {
    let collection_res: any;
    let yumi_cid: any;
    yumi_cid = online.yumi;
    let yumi_actor = await createYumiOnlineActor(yumi_cid);
    collection_res = await yumi_actor.getCollectionData(Principal.fromText(cid));
    return collection_res;
}

//collection data
export const getCollectionDataTest = async (cid: any) => {
    let collection_res: any;
    let yumi_cid: any;
    yumi_cid = boe.yumi
    let yumi_actor = await createYumiActor(yumi_cid);
    collection_res = await yumi_actor.getCollectionData(Principal.fromText(cid));
    return collection_res;
}

//artist
export const getMinter = async (cid: any) => {
    let erc721_actor = await createYumiErc721Actor(cid);
    let res = await erc721_actor.getMinter();
    return res;
}
//get caller profile info
export const findProfile = async (uid: any) => {
    let yumi_actor = await createYumiOnlineActor(uid);
    let res = await yumi_actor.findProfile();
    // console.log(res.ok.toString());
    return res;
}
//get nft info by token id
export const nftInfo = async (cid: any, tid: any) => {
    let res: any;
    let yumi_cid: any;
    yumi_cid = online.yumi
    let yumi_actor = await createYumiOnlineActor(yumi_cid)
    res = await yumi_actor.nftInfo(tid);
    return res;
}

//get nft info by token id
export const nftInfoTest = async (cid: any, tid: any) => {
    let res: any;
    let yumi_cid: any;
    let token_id = await tokenIdentifier(cid, tid);
    yumi_cid = boe.yumi;
    let yumi_actor = await createYumiActor(yumi_cid)
    res = await yumi_actor.nftInfo(token_id);
    return res;
}

import {
    shiku_wallet_nft_data_owner_create_service,
    shiku_wallet_nft_data_owner_search_service,
    shiku_wallet_user_nft_data_find_all_service,
    shiku_wallet_user_nft_data_find_all_service_test,
    shiku_wallet_user_nft_data_find_one_service,
    shiku_wallet_user_nft_data_find_one_service_test,
    shiku_wallet_user_nft_data_insert_service,
    shiku_wallet_user_nft_data_insert_service_test,
    // shiku_wallet_user_nft_data_update_service, 
    shiku_wallet_user_phase_find_service
} from "./dataServiceController";

const get_tokens_ext = async (pid: any, cid: any) => {
    let res: any = "";
    let principal = Principal.fromText(pid);
    let aid = getAccountId(principal, [0, 32]);
    // const YumiNftRepo = DI.em.fork().getRepository(YumiNft);
    
    // let json_arr: any=  {};
    let res_arr: any = []
    try {
        let yumi_erc721_actor = await createYumiErc721Actor(cid);

        res = await yumi_erc721_actor.tokens_ext(aid);
        console.log(res)
        // if (res == null) {
        //     return
        // }
        if (res.ok && res.ok[0] != null) {
            
            let nft_info = res.ok;
            let collection_res = await getCollectionData(cid);
            // console.log(collection_res)
            // console.log(nft_info)
            for(var i = 0; i < nft_info.length; i++) {
                // let json_: any = {};

                let token = nft_info[i][0];
                let nft_u8 = nft_info[i][2]
                let str_nft: any = {};
                let nft_res = await nftInfo(cid, token);
                // console.log(nft_res)
                let price_json: any;
                let name: any;
                price_json = nft_res.listing.fixed ? get_icp_price(Number(nft_res.listing.fixed.price)) : 'Not on the shell';

                let info = collection_res[0].info ? collection_res[0].info : 'info is not exists';
                name = info.name ? info.name: 'name is unknown';
                str_nft = await getNFTMetadata(nft_u8);
                // console.log(str_nft[0])
                let thumb_url = str_nft[0].thumb ? str_nft[0].thumb : "";
                // console.log(thumb_url)
                let token_str: any;
                let json_nft: any = {};

                token_str = await tokenIdentifier(cid, token);
                let owner: any;
                owner = await yumi_erc721_actor.bearer(token_str);

                json_nft = {
                    "icpAddress": pid,
                    "owner": owner.ok,
                    "tokenid": token,
                    "url": thumb_url,
                    "name": name,
                    "price": price_json.toString(),
                    "collection": cid,
                    "token": token_str,
                }
                // return json_nft
                // console.log(json_nft)
                await shiku_wallet_user_nft_data_insert_service(json_nft);

            }
        } else {
            return 
        }

        // return res_arr;
        
    } catch (e) {
        console.log("err ", e);
        // get_tokens_no_ext(principal, cid);
    }
    
}


const get_tokens_ext_test = async (pid: any, cid: any) => {
    let res: any = "";
    let principal = Principal.fromText(pid);

    let aid: any;
    aid = getAccountId(principal, [0, 32]);
    try {
        
        let yumi_erc721_actor = await createYumiErc721Actor(cid);
        res = await yumi_erc721_actor.tokens_ext(aid);
      
        if (res.ok && res.ok[0] != null) {
            
            let nft_info = res.ok;
            let collection_res = await getCollectionDataTest(cid);
            // console.log(collection_res)
            // console.log(nft_info)
            for(var i = 0; i < nft_info.length; i++) {
                // let json_: any = {};

                let token = nft_info[i][0];
                let nft_u8 = nft_info[i][2]
                // console.log(token)
                // console.log(nft_u8)
                let str_nft: any = {};
                let nft_res = await nftInfoTest(cid, token);
                // console.log(nft_res)
                let price_json: any;
                let name: any;
                price_json = nft_res.listing.fixed ? get_icp_price(Number(nft_res.listing.fixed.price)) : 'Not on the shell';

                let info = collection_res[0].info ? collection_res[0].info : 'info is not exists';
                name = info.name ? info.name: 'name is unknown';
                // console.log(nft_u8)
                str_nft = await getNFTMetadata(nft_u8);
                // console.log(str_nft[0])
                let thumb_url = str_nft[0].thumb ? str_nft[0].thumb : "";
                // console.log(thumb_url)
                let json_nft: any = {};
                let token_str: any;
                token_str = await tokenIdentifier(cid, token);
                let owner: any;
                owner = await yumi_erc721_actor.bearer(token_str);
                json_nft = {
                    "icpAddress": pid,
                    "owner": owner.ok,
                    "tokenid": token,
                    "url": thumb_url,
                    "name": name,
                    "price": price_json.toString(),
                    "collection": cid,
                    "token": token_str,
                }
                // console.log(json_nft)

                // return json_nft;
                await shiku_wallet_user_nft_data_insert_service_test(json_nft);

            }
        } else {
            return 
        }

        // return res_arr;
        
    } catch (e) {
        console.log("err ", e);
        // get_tokens_no_ext(principal, cid);
    }
    
}


const update_shiku_nft_data_service = async (pid: any) => {
    let nft_data: any;
    const yumiNftRepo = DI.em.fork().getRepository(YumiNft);
    let owner: any;
    let price_new: any;
    nft_data = await shiku_wallet_user_nft_data_find_all_service(pid);
    for(var i = 0; i < nft_data.length; i++) {
        // 
        let cid = nft_data[i].collection;
        let aid = nft_data[i].owner;
        let token_str = nft_data[i].token;
        let tokenid = nft_data[i].tokenid;
        let yumi_erc721_actor = await createYumiErc721Actor(cid);
        owner = await yumi_erc721_actor.bearer(token_str);
        let nft_res = await nftInfo(cid, tokenid);
        if (owner.ok != aid) {
            await yumiNftRepo.nativeDelete(nft_data[i]);
            // await shiku_wallet_user_nft_data_remove_by_tokenid_service_test(tokenid)
        } else {
            price_new = nft_res.listing.fixed ? get_icp_price(Number(nft_res.listing.fixed.price)) : 'Not on the shell';
            if (nft_data[i].price != price_new) {
                console.log(price_new)
                nft_data[i].price = price_new;
                await yumiNftRepo.getEntityManager().persistAndFlush(nft_data);
    
            }
        }
    
    }
}

const update_shiku_nft_data_service_test = async (pid: any) => {
    let nft_data: any;
    const yumiNftRepo = DI.em.fork().getRepository(YumiNftTest);
    let owner: any;
    let price_new: any;
    nft_data = await shiku_wallet_user_nft_data_find_all_service_test(pid);
    for(var i = 0; i < nft_data.length; i++) {
        // 
        let cid = nft_data[i].collection;
        let aid = nft_data[i].owner;
        let token_str = nft_data[i].token;
        let tokenid = nft_data[i].tokenid;
        let yumi_erc721_actor = await createYumiErc721Actor(cid);
        owner = await yumi_erc721_actor.bearer(token_str);
        let nft_res = await nftInfoTest(cid, tokenid);
        if (owner.ok != aid) {
            await yumiNftRepo.nativeDelete(nft_data[i]);
            // await shiku_wallet_user_nft_data_remove_by_tokenid_service_test(tokenid)
        } else {
            price_new = nft_res.listing.fixed ? get_icp_price(Number(nft_res.listing.fixed.price)) : 'Not on the shell';
            if (nft_data[i].price != price_new) {
                console.log(price_new)
                nft_data[i].price = price_new;
                await yumiNftRepo.getEntityManager().persistAndFlush(nft_data);
    
            }
        }
    
    }

}
export const list_collections_controller = async (req:any, res: any, next: any) => {
    try {
        let canisterId: any;
        let pid:any;
        let nft_res: any;
        let collections: any;
        if (req.body.canister_id == boe.yumi) {
            canisterId = req.body.canister_id;
            pid = req.body.pid;

            nft_res = await list_collections_test_controller(canisterId, pid);
            res.status(201).json({
                result:nft_res
            })
            await update_shiku_nft_data_service_test(pid)
            collections = await list_collections(canisterId);
            for(var i = 0; i <= collections.length; i++) {
                console.log(collections[i]);
                await get_tokens_ext_test(pid, collections[i]);
            }
        } else {
            canisterId = req.body.canister_id;
            pid = req.body.pid;
            nft_res = await list_collections_online_controller(canisterId, pid);
            res.status(201).json({
                result:nft_res
            })
            await update_shiku_nft_data_service(pid)
            collections = await list_collections_online(canisterId);
            for(var i = 0; i <= collections.length; i++) {
                console.log(collections[i]);
                await get_tokens_ext(pid, collections[i]);
            }
        }
    } catch (e) {
        console.log("error ", e)
        res.json({

        })
    }
    
}

export const list_collections_online_controller = async (cid: any, pid: any) => {
    try {
        let collections: any;
        // let yumi_nft_from_mongo: any
        collections = await list_collections_online(cid);
        let yumi_nft_from_mongo = await shiku_wallet_user_nft_data_find_one_service(pid);
        yumi_nft_from_mongo = null
        if (yumi_nft_from_mongo) {
            let all_yumi_nft_from_mongo = await shiku_wallet_user_nft_data_find_all_service(pid);

            // res.status(201).json({
            //     result: all_yumi_nft_from_mongo
            // })

            return all_yumi_nft_from_mongo

        } else {
            // console.log(yumi_nft_from_mongo)
            
            for(var i = 0; i <collections.length; i++) {
                // let json_nft: any;
                await get_tokens_ext(pid, collections[i]);

                // if (res_json_arr == null) {
                //     continue;
                    
                // }
                // json_.push(res_json_arr);
                
                // console.log(collections[i], res)
            }
            let all_yumi_nft_from_mongo = await shiku_wallet_user_nft_data_find_all_service(pid);
            
            // res.status(201).json({
            //     result: all_yumi_nft_from_mongo
            // })
            return all_yumi_nft_from_mongo
        }
    } catch (e) {
        console.log("err", e);
        // res.json({

        // })
    }
}

export const list_collections_test_controller = async (cid: any, pid: any) => {
    try {
        let collections: any;
        collections = await list_collections(cid);
        let yumi_nft_from_mongo = await shiku_wallet_user_nft_data_find_one_service_test(pid);
        if (yumi_nft_from_mongo) {
            let all_yumi_nft_from_mongo = await shiku_wallet_user_nft_data_find_all_service_test(pid);

            return all_yumi_nft_from_mongo
        } else {
            // console.log(yumi_nft_from_mongo)
            
            for(var i = 0; i <collections.length; i++) {
                let json_nft: any;

                await get_tokens_ext_test(pid, collections[i]);

            }
            let all_yumi_nft_from_mongo = await shiku_wallet_user_nft_data_find_all_service_test(pid);
            
            return all_yumi_nft_from_mongo
        }
    } catch (e) {
        console.log("err", e);

    }
}

//batch query nft by token id.
//token id is an array
export const nftInfos = async (uid: any, tid: any) => {
    // tid is an array
    let token_id = await tokenIdentifier(uid, tid);
    let yumi_actor = await createYumiOnlineActor(mnemonicWord.yumengAccount)
    let res = yumi_actor.nftInfos(token_id);
    return res;

}

const get_icp_price = (big_num: any) => {
    return (Number(big_num) / 1e8).toFixed(2);
}

const get_proj_event_id = (link: string) => {
    let proj_event_str = link.split("?")[1];
    let proj_event_arr = proj_event_str.split("&");
    let proj_str = proj_event_arr[1];
    let event_str = proj_event_arr[0];
    let proj_id = proj_str.split("=");
    let event_id = event_str.split("=");
    return {
        "proj_id": proj_id,
        "event_id": event_id,
    }

}

export const getArtInfo = async (canister: any, token_str: any) => {

    try {
        let art_json = {};
        let art_meta_json = {};
        
    let metadata_res: any;
    let art_info_res: any;
    // let token_id = await tokenIdentifier(canister, num);
    metadata_res = await metadata(canister, token_str);

    let byte_metadata = metadata_res.ok.nonfungible.metadata; 
    let nft_metadata = await getNFTMetadata(byte_metadata);
    let metadata_json = nft_metadata[0] ? nft_metadata[0] : 'No metadata';
    let art_thumb = metadata_json.thumb ? metadata_json.thumb : metadata_json.url;
    const filename = art_thumb.substring(art_thumb.lastIndexOf('/') + 1);
                
                    
                
                // await downloadImage(art_thumb);

                // await uploadFile(filename);
                // let art_new_url = await generateUrl(filename);

                if(metadata_json.hasOwnProperty('attributes')){
                    delete metadata_json['attributes'];
                }
                art_info_res = await nftInfo(canister, token_str);
                let price_json = art_info_res.listing.fixed ? get_icp_price(Number(art_info_res.listing.fixed.price)) : 'Not on the shell';

                // console.log(art_info_res);
                art_meta_json = {
                    'name': metadata_json.name,
                    'thumb': art_thumb,
                }
                art_json = {
                    'description': metadata_json.description,
                    'price': price_json,
                    'metadata': art_meta_json,
                    
                }

            
            return art_json;
           
            } catch (e: any) {
                console.log(e);
            }
}



export const getNftInfo = async (url: any) => {
    try {
        let metadata_res: any = {};
        let collection_res: any;
        let nft_info_res: any;
        let nft_index = '';
        let nft_name = '';
        let url_split= url.split("/");
        let canister = url_split[url_split.length - 2];
        let num = url_split[url_split.length - 1];
        metadata_res = await metadata(canister, num);

        let byte_metadata = metadata_res.ok.nonfungible.metadata; 
        let nft_metadata = await getNFTMetadata(byte_metadata);
        let metadata_json = nft_metadata[0] ? nft_metadata[0] : 'No metadata';
        let thumbnail = metadata_json.thumbnail ? metadata_json.thumbnail : metadata_json.url;
        const filename = thumbnail.substring(thumbnail.lastIndexOf('/') + 1);
        
        // await getImageAxios(thumbnail);
        // await getImage(thumbnail);
        // await downloadImage(thumbnail);
        let new_filename = 'new_'+filename;
     
        // let new_url = await generateUrl(new_filename);
        if(metadata_json.hasOwnProperty('attributes')){
            delete metadata_json['attributes'];
        }
        // console.log(new_url)
        
        collection_res = await getCollectionData(canister);
        // console.log(metadata_json); // art has no collection data

        let info = collection_res[0].info ? collection_res[0].info : 'info is not exists';
        let name = info.name ? info.name: 'name is unknown';
        // metadata_json['thumb'] = new_url;
        if(metadata_json.hasOwnProperty('NFT_Index')){
            nft_index = metadata_json['NFT_Index'];
        }
        if(metadata_json.hasOwnProperty('name')){
            
            
        }else {
             nft_name = name+' #'+nft_index ;
            metadata_json['name'] = nft_name;
        }  
        // console.log(collection_res[0]);
        let desc_json = collection_res[0].info ? collection_res[0].info.description[0] : 'No description'; 
        nft_info_res = await nftInfo(canister, num);
        // console.log(nft_info_res);
        
        let price_json = nft_info_res.listing.fixed ? get_icp_price(Number(nft_info_res.listing.fixed.price)) : 'Not on the shell';
        
        let json_ = {"price": price_json.toString(),
        "description": desc_json,
        "metadata": metadata_json,
        };
        
        console.log("return data");
        return json_;
    } catch (e) {
        console.log(e)
    }
}

//controller for get nft data
export const nft_info_controller = async (req: any, res: any, next: any) => {
    try {
    let metadata_res: any;
    let json_: any = {};
    if (req.body.link.includes("oat")) {
        let event_json = get_proj_event_id(req.body.link);
        json_ = await getEventsByProjectIdFn(event_json.proj_id[1], event_json.event_id[1]); 
    } else {
        console.log(req.body.link)
        let url_split= req.body.link.split("/");
        let canister = url_split[url_split.length - 2];
        let token_str = url_split[url_split.length - 1];
        // console.log(canister)
        console.log(token_str)

        metadata_res = await metadata(canister, token_str);
        let byte_metadata = metadata_res.ok.nonfungible.metadata; 
        let nft_metadata = await getNFTMetadata(byte_metadata);
        console.log(nft_metadata)
        let metadata_json = nft_metadata[0] ? nft_metadata[0] : 'No metadata';
        // console.log(metadata_json)
        let thumbnail = metadata_json.thumbnail ? metadata_json.thumbnail : (metadata_json.url ? metadata_json.url : metadata_json.sourceUrl);

        let new_filename = 'new_'+md5(thumbnail)+'.jpg';
        
        if(metadata_json.hasOwnProperty('category')){
            if(metadata_json['category'] == 'Art') {
                json_ = await getArtInfo(canister, token_str);
                await getImageAxios(thumbnail, new_filename, req.body.roomId, req.body.identifier, req.body.protocol, json_, req.body.link);
                let new_url = await generateUrl(new_filename);
                json_['metadata']['thumb']=new_url;
            } 
        } else {
            json_ = await getNftInfo(req.body.link);
            await getImageAxios(thumbnail, new_filename, req.body.roomId, req.body.identifier, req.body.protocol, json_, req.body.link);
            let new_url = await generateUrl(new_filename);
            json_['metadata']['thumb']=new_url;
        }
        
    }
        
        res.json(
        {result: json_,}
        ) 
    } catch(e:any) {
        console.log("获取信息报错",e);
        res.json(
            {}
        ) 
    }
}

export const record_info = async(token: any) => {
    let record_actor = await createRecordActor();
    let res = record_actor.getNftEvents(token);
    return res
}

export const record_info_controller = async(req: any, res: any, next: any) => {
    try {
        let record_arr: any = [];
        let res_arr: any = [];
        let record_json: any = {};
        let record_actor = await createPrincipalRecordActor();
        let principal  = Principal.fromText(req.body.pid);
        res_arr = await record_actor.getUserEvents(principal);
        let parsed_arr = res_arr[0];
        
        for(var i = 0; i < parsed_arr.length; i++) {
            let to: any= parsed_arr[i].to[0];
            let to_principal = to ? to.toString() : "null";
            let collection: any = parsed_arr[i].collection;
            let collection_json = collection ? collection.toString() : "null";

            let date: any = parsed_arr[i].date.toString();
            let from: any = parsed_arr[i].from[0];
            let from_principal = from ? from.toString() : "null";

            let item: any = parsed_arr[i].item.toString();
            let index: any = parsed_arr[i].index.toString();

            let price: any = parsed_arr[i].price.toString();

            let event_type: any = parsed_arr[i].eventType;
            record_json['to'] = to_principal;
            record_json['collection'] = collection_json;
            record_json['date'] = date;
            record_json['from'] = from_principal;
            record_json['item'] = item;
            record_json['index'] = index;
            record_json['price'] = price;
            record_json['event_type'] = event_type;
            // console.log(record_json)
            record_arr.push(record_json)
        }
        // console.log(res_arr)
        res.status(201).json({
            result: record_arr
        })
        
    } catch (e) {
        console.log("errro ", e)
    }
    
    // return res
}

export const getByEventIdFnController = async (event_id: any) => {
    let eventsByEventIdResult: any = []; 
    let oatActor = await createOatActor(); 
     eventsByEventIdResult = await oatActor.getEventsByEventId(event_id);
     console.log(oatEvents(eventsByEventIdResult[0]));
    // return oatEvents(eventsByEventIdResult[0]);
  };

export const getEventsByProjectIdFn = async (proj_id: any, event_id: any) => {
    let eventsByProjectIdResult: any = []; 
    let res_json: any = {};
    let oatActor = await createOatActor();
    eventsByProjectIdResult = await oatActor.getEventsByProjectId(parseInt(proj_id));
    let newEventsByProjectIdResult = eventsByProjectIdResult.map((item: any) =>
      oatEvents(item)
    );
    newEventsByProjectIdResult = newEventsByProjectIdResult
            .filter(
              (data: any) =>  data.id === parseInt(event_id)
              );
    res_json['metadata'] = {};
    let thumbnail = newEventsByProjectIdResult[0].featured ? newEventsByProjectIdResult[0].featured : 'url is null';
    const filename = thumbnail.substring(thumbnail.lastIndexOf('/') + 1);
    console.log(thumbnail)
    // await downloadImage(thumbnail);

    // await uploadFile(filename);
    // let new_url = await generateUrl(filename);
    // console.log("new url", new_url)
    // res_json['metadata']['thumb'] = new_url;
    // newEventsByProjectIdResult[0].featured ? newEventsByProjectIdResult[0].featured : 'url is null';
    res_json['metadata']['thumb'] = thumbnail;
    res_json['metadata']['name'] = newEventsByProjectIdResult[0].name ? newEventsByProjectIdResult[0].name : 'name is null';
    res_json['description'] = newEventsByProjectIdResult[0].description ? newEventsByProjectIdResult[0].description : 'description is null';
    res_json['price'] = "oat not shell";
    return res_json;
  };

export const oatEvents = (item: any) => {
    return {
      camp: Number(item.camp),
      canister: item.canister.toText(),
      claimed: Number(item.claimed),
      description: item.description,
      eventEndTime: Number(item.eventEndTime) / 1000000,
      eventStartTime: Number(item.eventStartTime) / 1000000,
      featured: item.featured,
      id: Number(item.id),
      link: item.link,
      name: item.name,
      oatReleaseEndTime: Number(item.oatReleaseEndTime) / 1000000,
      oatReleaseStartTime: Number(item.oatReleaseStartTime) / 1000000,
      projectId: Number(item.projectId),
      eventType: { ...item.eventType },
      permisson: { ...item.permisson },
    };
  };

import { DI } from "../config/database.config";
import { YumiNft } from "../entities/NftEntity";
import { YumiNftTest } from "../entities/NftEntityTest";
import { createLandsActor, createYumiActor } from "./actorController";
import { CanvasLedgerController } from "./shikuNftLedger";

export const shiku_land_prop_controller = async(req: any, res: any, next: any) => {
    let land_prop_res: any;
    const actor = await createLandsActor();
    land_prop_res = await actor.land_info_by_id(req.body.land_id);
    console.log(land_prop_res);
}