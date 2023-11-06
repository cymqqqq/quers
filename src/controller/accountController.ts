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
import { LedgerController } from './accountLedgerContoller';
import {
    createBlockActor,
    createBlockIndexActorFake,
    createLedgerActor,
    createLedgerActorFake,
    createShikuTestTokenActor,
    createShikuTestTokenBlockIndexActor
} from "./actorController";
import { shiku_wallet_user_data_service, shiku_wallet_user_phase_find_service } from './dataServiceController';
import { JsonObject } from '@dfinity/candid';
// set subaccount base value
const SUB_ACCOUNT_ZERO = Buffer.alloc(32);

// get account array from principal
export const getAidArrByPid = (pid: Principal) => {
    // get account id from principal id and subaccount base value
    let aid = getAccountId(pid, SUB_ACCOUNT_ZERO);
    // get account id array from hex string method
    let aidArr = Array.from(fromHexString(aid));
    return aidArr;
}

export const icp_query_newest_block_index = async () => {
    // set tip of chain variable
    let tip_of_chain: any;
    // set block actor from create block actor function
    let block_actor = await createBlockActor();
    // get value of newest block
    tip_of_chain = await block_actor.tip_of_chain();
    // return json value
    return tip_of_chain
}

// query newest block index controller
export const queryNewestBlockIndexController = async (req: any, res: any, next: any) => {
    // set tip of chain variable
    let tip_of_chain: any;
    let stt_actor: any;
    let tip_index: any
    // set block actor from create block actor function
    // let block_actor = await createBlockActor();
    // get value of newest block
    // tip_of_chain = await block_actor.tip_of_chain();
    // return json value
    try {
        stt_actor = new LedgerController()
        stt_actor.set_canister(req.body.canister_id);
        tip_of_chain = await stt_actor.build_query_newest_block_controller()
        tip_index = tip_of_chain.Ok? (tip_of_chain.Ok.tip_index ? tip_of_chain.Ok.tip_index : "no tip index") : "none value in tip of chain"
        res.status(201).json({
            result: tip_index.toString()
        })
        
    } catch (e) {
        console.log("error ", e)
        res.json({
            result: e
        })
    }
}

// query fake newest block index controller
export const queryFakeNewestBlockIndexController = async (req: any, res: any, next: any) => {
    let tip_index: any
    try {
        // set tip of chain variable
        let tip_of_chain: any = "";
        // get block actor from create block index actor function
        let block_actor = await createBlockIndexActorFake(mnemonicWord.yumengAccount);
        // get value of fake newest block
        tip_of_chain = await block_actor.tip_of_chain();
        tip_index = tip_of_chain.Ok? (tip_of_chain.Ok.tip_index ? tip_of_chain.Ok.tip_index : "no tip index") : "none value in tip of chain"
        // return json value
        res.json({
            result: tip_index.toString()
        })
    } catch (e) {
        console.log("error ",e)
        res.json({
            result: e
        })
    }
    
}

// query block
export const query_block = async (index: any) => {
    // set block result variable
    let block_res: any;
    let from: any
    let to: any
    let amount: any
    let timestamp: any
    // get block actor
    const block_actor = await createBlockActor();
    // query block result from block index 
    // notes: we need to transform index into bigint type
    block_res = await block_actor.block(BigInt(index));
    // extract from address and transform to string type
    from = block_res.Ok.Ok.transaction.transfer.Send.from; 
    // extract to address and transform to string type
    to = block_res.Ok.Ok.transaction.transfer.Send.to;
    // extract transaction amount
    amount = block_res.Ok.Ok.transaction.transfer.Send.amount.e8s.toString();
    // extract timestamp
    timestamp = block_res.Ok.Ok.timestamp.timestamp_nanos.toString();
    // perform json
    let json_ = {
        "from": from,
        "to": to,
        "amount": amount,
        "timestamp": timestamp,
    };
    return json_;
}

// scan block controller
export const scanBlockController = async (req: any, res: any, next: any) => {
    try {
        // set vector result variable
        let vec_res: any = [];
        // set start index
        let start = req.body.start;
        // set end index
        let end = req.body.end;
        // scan cycle
        for (start; start <= end; start++) {
            let res = await query_block(BigInt(start));
            vec_res.push(res);
        }
   
        res.json({
            result: vec_res
        })
    } catch (e) {
        console.log("error ", e)
        res.json({
            result: e
        })
    }
    
}

// query block controller
export const query_block_controller = async (req: any , res: any) => {
    // set block result variable
    let block_res: any;
    let controller: any;
    try {
        controller = new LedgerController();
        controller.set_canister(req.body.canister_id);
        controller.set_start_index(req.body.index);
        block_res = await controller.build_query_block_controller()
        // get block result
        // block_res = await query_block(req.body.index);
        // print block result
        console.log(block_res)
        // return json 
        res.json({
            result: block_res
        })
    } catch (e) {
        console.log("获取信息报错",e);
        res.json(
            {result: e}
        ) 
    }
    
}

export const query_block_ledger_controller = async (req: any, res: any, next: any) => {
    let query_res: any;
    let block_actor: any;
    try {
        block_actor = new LedgerController()
        // block_actor.set_block_length(req.body.block_length)
        block_actor.set_canister(req.body.canister_id)
        block_actor.set_start_index(req.body.index)
        query_res = await block_actor.build_query_block_controller()
        console.log(query_res)
        res.status(201).json({
            result: query_res,
        })

    } catch (e) {
        console.log("error ", e)
        res.json({
            result: e
        })
    }
}


// common transfer icp
export const send = async (phase: any, to: any, amount: any, canister_id: any) => {
    // create ledger actor
    const actor = await createLedgerActor(phase, canister_id);
    // transform string address to principal id
    const pid = Principal.fromText(to);
    // get account id array
    const aidarr = getAidArrByPid(pid);
    // set transfer params
    const params = {
        // receiver address
        to: aidarr,
        // transfer fee
        fee: { e8s: 10000 },
        memo: 0,
        from_subaccount: [Array(28).fill(0).concat(to32bits(0))],
        created_at_time: [] as string[],
        amount: { e8s: BigInt(amount * 1e8) },
    }
    // perform transfer action
    const res = await actor.transfer(params);
    return res;
}

// common fake transfer icp
export const send_fake = async (phase: any, to: any, amount: any, canister_id: any) => {
    // create fake ledger actor
    const actor = await createLedgerActorFake(phase, canister_id);
    // transform string address to principal id
    const pid = Principal.fromText(to);
    // get account id array
    const aidarr = getAidArrByPid(pid);
    // set transfer params
    const params = {
        // receiver address
        to: aidarr,
        // transfer fee
        fee: { e8s: 10000 },
        memo: 0,
        from_subaccount: [Array(28).fill(0).concat(to32bits(0))],
        created_at_time: [] as string[],
        amount: { e8s: BigInt(amount * 1e8) },
    }
    // perform transfer action
    const res = await actor.transfer(params);
    return res;
}


export const stt_withdraw = async (canister_id: any, principal: any, stt_amount: any) => {
    let transfer_res: any;
    let stt_actor: any;
    let pid: any;
    let amount: any;
    try {
        stt_actor = await createShikuTestTokenActor(canister_id);
        pid = Principal.fromText(principal);
        let to: any = {
            owner: pid,
            subaccount: [],
        };
        amount = stt_amount;
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
        return JSON.parse(transfer_res.Ok)
        // res.status(201).json({
        //     result: JSON.parse(transfer_res.Ok),
        // })
    } catch (e) {
        console.log("error ", e)
        // res.json({

        // })
    }
}

// withdraw controller
// export const withdraw_controller = async (req: any, res: any, next: any) => {
export const withdraw_icp = async (canister_id: any, to_principal: any, icp_amount: any) => {
    let withdraw_res: any;
    try {
        // set transfer result variable
        let send_res: any = {};
        // perform withdraw action
        send_res = await send(mnemonicWord.yumengAccount, to_principal, icp_amount, canister_id);
        // return json
        withdraw_res = JSON.parse(send_res.Ok);

        return withdraw_res
    } catch (e) {
        console.log("interface error ", e);

    }

}

// withdraw controller
export const withdraw_controller = async (req: any, res: any, next: any) => {
        let withdraw_res: any;
        let controller: any;
        // set transfer result variable
        let send_res: any;
        try {
            controller = new LedgerController();
            controller.set_canister(req.body.canister_id);
            controller.set_principal(req.body.to_principal);
            controller.set_amount(req.body.amount);
            send_res = await controller.build_transfer_controller();
    
            res.json({
                result: send_res
            }) 
        } catch (e) {
            console.log("interface error ", e);
            res.json(
                {result: e}
            ) 
        }
    
    }
    

// fake withdraw controller
export const withdraw_controller_fake = async (req: any, res: any, next: any) => {
    try {
        // set transfer result variable
        let send_res: any = {};
        // perform fake withdraw action
        send_res = await send_fake(mnemonicWord.yumengAccount, req.body.to_principal, req.body.amount, req.body.canister_id);
        // console.log(send_res.Ok)
        // return json
        res.json({
            result: send_res.Ok.toString()
        }) 
    } catch (e) {
        console.log("interface error ", e);
        res.json(
            {result: e}
        ) 
    }

}

// refund controller 
export const refund_controller = async (req: any, res: any) => {
    try {
        // set refund result variable
        let send_res: any = {};
        let phase: any;
        phase = await shiku_wallet_user_phase_find_service(req.body.from_principal);
        // perform refund action
        send_res = await send(phase, req.body.to_principal, req.body.amount, req.body.canister_id);
        // return json
        res.json({
            result: send_res.Ok.toString()
        }) 
    } catch (e) {
        console.log("interface error ", e);
        res.json(
            {result: e}
        ) 
    }
}

// fake refund controller
export const refund_controller_fake = async (req: any, res: any) => {
    try {
        // fake refund result variable
        let send_res: any = {};
        let phase: any;
        phase = await shiku_wallet_user_phase_find_service(req.body.from_principal);
        
        // perform fake refund action
        send_res = await send_fake(phase, req.body.to_principal, req.body.amount, req.body.canister_id);
        // return json
        res.json({
            result: send_res.Ok.toString()
        }) 
    } catch (e) {
        console.log("interface error ", e);
        res.json(
            {result: e}
        ) 
    }
}

//uid: user phase
//user: principal id or account id
export const accountBalance = async (user: any, canister_id:any) => {
    let icp: any;
    let account_balance_result: any;
    if (user.match(/-/)) {

        user = getAidArrByPid(Principal.fromText(user));
    } else {
        user = Array.from(fromHexString(user));
    }
    // create ledger actor
    let ledger_actor = await createLedgerActor(mnemonicWord.yumengAccount, canister_id);
    // get accout balance from user principal
    account_balance_result = await ledger_actor.account_balance({ account: user });
    console.log(account_balance_result)
    icp = account_balance_result.e8s ? account_balance_result.e8s : 0;

    return icp;
}

export const accountBalance_ShikuTestToken = async (canister_id: any, principal: any) => {
    let balance_json: any;
    let stt_actor: any;
    let pid: any;
    try {
        stt_actor = await createShikuTestTokenActor(canister_id);
        pid = Principal.fromText(principal);
        let owner_obj: any = {
            owner: pid,
            subaccount: [],
        };
        balance_json = await stt_actor.icrc1_balance_of(owner_obj);
        
        return JSON.parse(balance_json)
    } catch (e) {
        console.log("error ", e)
    }
}


//uid: user phase
//user: principal id or account id
export const accountBalance_fake = async (user: any, canister_id: any) => {
    if (user.match(/-/)) {

        user = getAidArrByPid(Principal.fromText(user));
    } else {
        user = Array.from(fromHexString(user));
    }
    // create fake ledger actor
    let ledger_actor = await createLedgerActorFake(mnemonicWord.yumengAccount, canister_id);
    // get fake account balance from user principal
    let res = ledger_actor.account_balance({ account: user });
    return res;
}

// fake query block
export const query_block_fake = async (index: any) => {
    // create fake block index actor
    let block_actor = await createBlockIndexActorFake(mnemonicWord.yumengAccount);
    // set fake block result variable
    let res: any = {};
    // query fake block info from block index
    res = await block_actor.block(index);
    // extract to address from block 
    let to = res.Ok.Ok.transaction.transfer.Send.to;
    // extract from address from block 
    let from = res.Ok.Ok.transaction.transfer.Send.from;
    // extract transfer amount from block
    let amount = res.Ok.Ok.transaction.transfer.Send.amount.e8s.toString();
    // process icp accuracy
    // let icp_amount = get_icp(amount);
    // extract timestamp from block result
    let ts = res.Ok.Ok.timestamp.timestamp_nanos.toString();
    // return json
    let json: any = {
        "from": from,
        "to": to,
        "amount": amount,
        "timestamp": ts,
    }
    return json;
}

// fake query block controller
export const query_block_fake_controller = async (req: any, res: any, next: any) => {
    try {
        // set fake block result variable
        let block_res:any = {};
        // query fake block result from block index
        block_res = await query_block_fake(parseInt(req.body.index));
        res.status(201).json({
            result: block_res
        })
    } catch (e) {
        console.log(e);
        res.json({
            result: e
        })
    }
}

// process icp accuracy
export const get_icp = (big_num: any) => {
    return (Number(big_num) / 1e8).toFixed(5);
}

// account balance controller
export const account_balance_controller = async (req: any, res: any) => {
    // account balance variable
    let account_balance_result: any = {}; 
    let balance_controller: any;
    try {
        balance_controller = new LedgerController()
        balance_controller.set_canister(req.body.canister_id);
        balance_controller.set_principal(req.body.user);
        account_balance_result = await balance_controller.build_account_balance_controller();
        // get account balance result from user's principal id
        // account_balance_result = await accountBalance(req.body.user, req.body.canister_id);
        // get icp value
        // let icp = account_balance_result.e8s ? account_balance_result.e8s : 0;
        console.log(account_balance_result);
        res.json({
            result: JSON.parse(account_balance_result)
            // result: get_icp(icp)
        })  
    } catch (e) {
        console.log(e);
        res.json({
            result: e
        })
    }
    
}

// fake account balance controller
export const account_balance_controller_fake = async (req: any, res: any) => {
    // set fake account balance result variable
    let account_balance_result: any = {}; 
    try {
        // get fake account balance result 
        account_balance_result = await accountBalance_fake(req.body.user, req.body.canister_id);
        // extract icp
        let icp = account_balance_result.e8s ? account_balance_result.e8s : 0;
        console.log(icp);
        // return json
        res.json({
            result: JSON.parse(icp)
            // result: get_icp(icp)
        })  
    } catch (e) {
        console.log(e);
        res.json({
            result: e
        })
    }
    
}
 
export const stt_query_newest_block = async (stt_canister: any) => {
    let query_res: any;
    let stt_actor: any;
    let stt_block_index_actor: any;
    let hash_tree: any;
    try {
        stt_actor = await createShikuTestTokenActor(stt_canister);
        stt_block_index_actor = await createShikuTestTokenBlockIndexActor()
        query_res = await stt_block_index_actor.total_transactions();
        
        console.log(query_res)
        
    } catch (e) {
        console.log("error ",e);
    }
}

export const stt_transfer = async (stt_canister: any, stt_principal: any, stt_amount: any) => {
    let transfer_res: any;
    let stt_actor: any;
    let pid: any;
    let amount: any;
    // let canister_id: any
    try {
        stt_actor = await createShikuTestTokenActor(stt_canister);
        pid = Principal.fromText(stt_principal);
        let to: any = {
            owner: pid,
            subaccount: [],
        };
        amount = stt_amount;
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
        return JSON.parse(transfer_res.Ok)
        // res.status(201).json({
        //     result: JSON.parse(transfer_res.Ok),
        // })
    } catch (e) {
        console.log("error ", e)
        
    }
}

export const stt_get_transactions = async (canister_id: any, start_index: any, block_length: any) => {
    let transaction_res: any;
    let stt_actor: any;
    let start: any;
    let length: any;
    let json_res: any;
    try {
        stt_actor = await createShikuTestTokenActor(canister_id);
        start = start_index;
        length = block_length;
        let obj: any = {
            start: parseInt(start),
            length: parseInt(length),
        }
        transaction_res = await stt_actor.get_transactions(obj);
        console.log(transaction_res)
        console.log(transaction_res.transactions[0].mint[0].to.owner.toString())
        console.log(transaction_res.transactions[0].mint[0].amount)
        let timestamp = transaction_res.transactions[0].timestamp ? transaction_res.transactions[0].timestamp : "timestamp is none"
        json_res = {
            "timestamp": timestamp.toString(),
            "to": transaction_res.transactions[0].mint[0].to.owner.toString(),
            "amount": transaction_res.transactions[0].mint[0].amount.toString()
        }
        // console.log(transaction_res.transactions[0].mint[0])
        return JSON.parse(JSON.stringify(json_res))
        // res.status(201).json({
        //     result: transaction_res,
        // })
    } catch (e) {
        console.log("error ", e)
        // res.json({

        // })
    }
}

export const stt_get_transaction = async (canister_id: any, start_index: any) => {
    let transaction_res: any;
    let stt_actor: any;
    let start: any;
    let json_res: any;
    try {
        stt_actor = await createShikuTestTokenActor(canister_id);
        start = start_index;
        let obj: any = start_index
        transaction_res = await stt_actor.get_transaction(parseInt(obj));
        // console.log(transaction_res[0])
        // console.log(transaction_res[0].mint[0].to.owner.toString())
        // console.log(transaction_res[0].mint[0].amount)
        json_res = {
            "timestamp": transaction_res[0].timestamp.toString(),
            "to": transaction_res[0].mint[0].to.owner.toString(),
            "amount": transaction_res[0].mint[0].amount.toString()
        }
        // console.log(transaction_res.transactions[0].mint[0])
        return JSON.parse(JSON.stringify(json_res))
        // res.status(201).json({
        //     result: transaction_res,
        // })
    } catch (e) {
        console.log("error ", e)
        // res.json({

        // })
    }
}

export const generatePid = async () => {
    const TEST_MNEMONIC = generateMnemonic();
    let identity = await getIdentityFromSeed(TEST_MNEMONIC);
    let pid_str = identity.getPrincipal()
    let account = getAccountId(pid_str, SUB_ACCOUNT_ZERO)
    let json_ = {
        "memory": TEST_MNEMONIC,
        "pid": identity.getPrincipal().toString(),
        "account": account
    }
    return json_; 
    // console.log("generated principal ", identity.getPrincipal().toString());
}

// export const query_memonic_controller = async (req: any, res: any, next: any) => {
//     const icWalletUserRepo = DI.em.fork().getRepository(icWalletUser);
//     let memnic = await icWalletUserRepo.findOne({icpAddress: req.body.pid});
//     if (!memnic) {
//         res.status(501).json({
//             result: "the user's principal not exists in shiku wallet"
//         })
//     } else {
//         res.status(201).json({
//             result: memnic
//         })
//     }
// }
export const get_pid_controller = async (req: any, res: any) => {
    let pid_result = await generatePid();
    await shiku_wallet_user_data_service(pid_result);
    res.json({
        result: pid_result
    })
}
