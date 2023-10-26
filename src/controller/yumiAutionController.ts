
import { 
    createLandsActor,
    createYumiAutioinActor
 } from './actorController';


export const get_land_nft_info = async (tokenid: any) => {
    
}
export const get_icp = (big_num: any) => {
    return (Number(big_num) / 1e8).toFixed(5);
}

const get_ductch_info = async (actor: any, duchinfo: any) => {
    try {
        let json_: any = {};
        let start_time: any;
        let end_time: any;
        start_time = duchinfo.startTime;
        end_time = duchinfo.endTime;
        let token = duchinfo.tokenIdentifier;
        console.log(duchinfo)
        
        json_ = {
            "start_time": start_time.toString(),
            "end_time": end_time.toString(),
            "token_id": token,
            // "price": icp_price
        }
        return json_;
    } catch (e) {
        console.log("error ", e)
    }
    
}

export const get_final_info = async (land_actor: any, actor: any, token: any) => {
    let token_info: any;
    let aution_price_icp: any;
    let aution_price: any;
    let aution_symbol: any;
    let final_info_json: any;
    try {
        token_info = token;

        aution_price = await actor.getPriceOfAuction(token_info.toString());
        aution_symbol = aution_price[0] ?  (aution_price[0].token ? (aution_price[0].token.symbol ? aution_price[0].token.symbol : "unknown symbol") : "unknown token") : "unknown aution";
        aution_price_icp = aution_price[0] ? (aution_price[0].price ? (get_icp(aution_price[0].price.toString())) : "unknown price") : "unknown aution";
        // console.log(aution_price[0].token)
        final_info_json = {
            "symbol": aution_symbol,
            "price": aution_price_icp,
        }
        // // console.log(icp_price)
        return final_info_json;
    } catch (e) {
        console.log("error ",e)
    }
    
}

export const get_aution = async (tokenid: any) => {
    // let aution_price: any = "";
    try {
        let nft_info: any = {};
        let lands_actor = await createLandsActor()
        let actor = await createYumiAutioinActor();
        let token = await lands_actor.token_identifier(tokenid);
        // console.log(token)
        nft_info = await actor.nftInfo(token);
        // console.log(nft_info)

        let duchlisting = nft_info.listing;
        let result = duchlisting.dutchAuction? await get_ductch_info(actor, duchlisting.dutchAuction) : await get_final_info(lands_actor, actor, token);
        
        // console.log(aution_price)
        return result;
        // return aution_price;
        
    } catch (e) {
        console.log("error ", e)
    }
    
}

export const get_aution_controller = async (req: any, res: any, next: any) => {
    try {
        let aution_result = await get_aution(req.body.token_id);
        // console.log(aution_result)
        res.status(201).json({
            result: aution_result
        })
    } catch (e) {
        console.log("error ", e);
        res.json({

        })
    }
}