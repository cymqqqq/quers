import { Principal } from "@dfinity/principal";
import { boe,ppe,online, mnemonicWord } from "../utils/config";
import { 
    createShikuActor,
    createShikuCanvasNftContoller,
    createShikuCoCreateNftController,
    createExtNftController
 } from "./actorController";
import { getAccountId, tokenIdentifier } from "../utils/crypto";
import { getNFTMetadata, shiku_refund_controller } from "./shikuController";
// Shiku Canvas Nft context
export class CanvasLedgerController {
    public canister: any;
    public from_principal: any;
    public to_principal: any;
    public tokenid: any;
    public prop: any;



    public set_prop(prop: any) {
        this.prop = prop;
    }

    public set_tokenid(tokenid: any) {
        this.tokenid = tokenid;
    }

    public set_from_principal(from_principal: any) {
        this.from_principal = from_principal;
    }

    public set_to_principal(to_principal: any) {
        this.to_principal = to_principal;
    }

    public set_canister(canister: any) {
        this.canister = canister;
    }

    async build_shiku_nft_transfer_controller() {
        switch(this.canister) {
            case boe.shikuCanvasNft:
                return await shikuCanvasNftWithdrawController(this.canister, this.from_principal, this.to_principal, this.tokenid);
            case online.shiku_nft:
                return await shiku_refund_controller(this.canister, this.tokenid, this.to_principal);
        } 
   }

   async build_shiku_nft_mint_controller() {
        switch(this.canister) {
            case boe.shikuCanvasNft:
                return await shikuCanvasNftMintController(this.canister, this.to_principal)
            case boe.shikuCoCreateNft:
                return await shikuCoCreateNftMintController(this.canister, this.to_principal, this.prop);

        }
   }
   async build_shiku_nft_owner_tokenid_controller() {
        switch(this.canister) {
            case boe.shikuCanvasNft:
                return await shikuCavansNftOwnerTokenIdController(this.canister, this.to_principal)
        }
   }

   async build_shiku_nft_metadata_controller() {
        switch(this.canister) {
            case boe.shikuCoCreateNft: 
                return await shikuCoCreateNftGetMetadataController(this.to_principal)
            case boe.yumi_test1:
                return await shikuExtNftGetMetadataController(this.to_principal)
            
        }
   }
}

export const shikuCanvasNftWithdrawController = async(cid: any, fromPid: any, toPid: any, tokenid: any) => {
    let shiku_canvas_actor: any;
    let transfer_res: any;
    try {
        shiku_canvas_actor = await createShikuCanvasNftContoller(cid);
        const from_principal = Principal.fromText(fromPid);
        const to_principal = Principal.fromText(toPid);
        const token = await tokenIdentifier(cid, tokenid);
        const params = {
            token: token,
            from: {principal: from_principal},
            to: {principal: to_principal},
            notify: true,
            memo: [] as any[],
            subaccount: [] as any[],
            amount: 1,
        };
        transfer_res =  await shiku_canvas_actor.transfer(params);
        return transfer_res;

    } catch (e) {
        console.log("error ", e);
    }
}

export const shikuCoCreateNftMintController = async (cid: any, toPid: any, prop: any) => {
    let shiku_cocreate_actor: any;
    let mint_res: any;
    try {
        shiku_cocreate_actor = await createShikuCoCreateNftController(cid);
        const principal = Principal.fromText(toPid);
        const params: any = {
            to: {principal: principal},
            prop: prop ? [prop] : [''],
            // prop: []
        }
        // console.log(params)
        mint_res = await shiku_cocreate_actor.mintNFT(params);
        return mint_res;
    } catch (e) {
        console.log("error ", e)
    }
}

export const shikuCanvasNftMintController = async(cid: any, toPid: any) => {
    let shiku_canvas_actor: any;
    let mint_res: any;
    try {
        shiku_canvas_actor = await createShikuCanvasNftContoller(cid);
        const principal = Principal.fromText(toPid)
        const params: any = {
            to: {principal: principal},
            prop: [],  
        };
        mint_res =  await shiku_canvas_actor.mintNFT(params);
        return mint_res;

    } catch (e) {
        console.log("error ", e);
    }
}

export const shikuElementNftGetMetadataController = async (pid: any) => {
    let shiku_elem_actor: any
    let metadata_res: any
    let str_data: any
    try {
        shiku_elem_actor = await createShikuActor(mnemonicWord.yumengAccount, online.shiku_nft)
        metadata_res = await shiku_elem_actor.tokens_ext(pid)
        let nft_u8 = metadata_res.ok[0][2]
        str_data = await getNFTMetadata(nft_u8[0])
        return str_data
    } catch (e) {
        console.log("error ",e)
    }
}


export const shikuCoCreateNftGetMetadataController = async(pid: any) => {
    let shiku_canvas_actor: any;
    let metadata_res: any;
    let str_data: any
    try {
        shiku_canvas_actor = await createShikuCoCreateNftController(boe.shikuCoCreateNft);
        // let token = await tokenIdentifier(cid, parseInt(tid))
        metadata_res =  await shiku_canvas_actor.tokens_ext(pid);
        let nft_u8 = metadata_res.ok[0][2]
        // console.log(nft_u8[0])
        str_data = await getNFTMetadata(nft_u8[0]);
        // console.log(str_data)
        return str_data;

    } catch (e) {
        console.log("error ", e);
    }
}

export const shikuExtNftGetMetadataController = async(pid: any) => {
    let shiku_ext_actor: any;
    let metadata_res: any;
    let str_data: any
    let nft_u8: any
    let data: any = []
    try {
        shiku_ext_actor = await createExtNftController(boe.yumi_test1);
        // let token = await tokenIdentifier(cid, parseInt(tid))
        let account_id = getAccountId(pid)
        metadata_res =  await shiku_ext_actor.tokens_ext(account_id);
        // console.log(metadata_res)
        nft_u8 = metadata_res.ok
        // console.log(nft_u8)
        for(var i = 0; i < nft_u8.length; i++) {
            console.log(nft_u8[i][2])
            str_data = await getNFTMetadata(nft_u8[i][2]);
            data.push(str_data[0])
            console.log(data)
        }
        
        // console.log(str_data)
        return data;

    } catch (e) {
        console.log("error ", e);
    }
}

export const shikuCavansNftOwnerTokenIdController = async(cid: any, toPid: any) => {
    let shiku_canvas_actor: any;
    let query_res: any;
    let str_data: any
    try {
        shiku_canvas_actor = await createShikuCanvasNftContoller(cid);
        const principal = Principal.fromText(toPid)
      
        query_res =  await shiku_canvas_actor.owner_token_id_set(principal);
        let nft_u8 = query_res.ok[0][2]
        str_data = await getNFTMetadata(nft_u8[0])
        return str_data;

    } catch (e) {
        console.log("error ", e);
    }
}


export const shikuCavansNftGetMetadataController = async(pid: any) => {
    let shiku_canvas_actor: any;
    let query_res: any;
    let str_data: any
    try {
        shiku_canvas_actor = await createShikuCanvasNftContoller(boe.shikuCanvasNft);
        query_res =  await shiku_canvas_actor.tokens_ext(pid);
        let nft_u8 = query_res.ok[0][2]
        str_data = await getNFTMetadata(nft_u8[0])
        return str_data;

    } catch (e) {
        console.log("error ", e);
    }
}