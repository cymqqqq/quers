
import { 
    createYumiActor,
    createYumiErc721Actor,
    createYumiOnlineActor
} from "./actorController";
import { compressImgYumi } from "../utils/cloud_api";
import { boe } from "../utils/config";
import { Principal } from "@dfinity/principal";
import { tokenIdentifier } from "../utils/crypto";
// export const buyNowTest =async (tid: any) => {
//     let yumiactor = await createYumiActor();
//     let res = yumiactor.buyNow(tid);
//     return res;
// }

//for test env
// export const buynowtest_controller = async (req: any, res: any) => {
//     let buynowtest_result = await buyNowTest(req.body.tid);
//     res.json({
//         result: buynowtest_result
//     })
// }

//for product env
export const buyNow = async (uid: any, tid: any) => {
    // create yumi online actor
    let yumionline_actor = await createYumiOnlineActor(uid)
    // buy now 
    let res = yumionline_actor.buyNow(tid);
    return res; 
}

// buy now contoller 
export const buynow_controller = async (req: any, res: any) => {
    // yumi buy now online
    let buynow_result = await buyNow(req.body.uid, req.body.tid);
    // return json
    res.json({
        result: buynow_result
    })
}

// list yumi test collections
export const list_collections = async (cid: any) => {
    // create yumi test actor
    let yumi_actor = await createYumiActor(cid);
    // get yumi test collections
    return yumi_actor.listCollections()
}

export const nftInfo = async (cid: any, index: any) => {
    let yumi_test_cid: any;
    yumi_test_cid = boe.yumi;
    let yumi_test_actor: any;
    let tid = await tokenIdentifier(cid, index)
    yumi_test_actor = await createYumiActor(yumi_test_cid);
    let res = await yumi_test_actor.nftInfo(tid);
    console.log(res);
    return res;
}


// create collection 
export const create_shiku_collection = async () => {
    const info: any = {
        url: [''],
        featured: [''],
        logo: ['https://yuminftdata-1257009156.cos.ap-nanjing.myqcloud.com/images/005-01.png'],
        name: ['Shiku Canvas demo'],
        banner: [''],
        description: ['Shiku is a metaverse.'],
        links: [{
            'twitter': [''],
            'instagram': [''],
            'discord': [''],
            'telegram': [''],
            'medium': [''],
            'yoursite': ['']
        }],
        isVisible: true,
        royalties: 1,
        category: [''],
        releaseTime: [],
        openTime: [],
        standard: {ext: null},
    };
    let yumi_test_cid: any;
    let collection_info: any;
    yumi_test_cid = boe.yumi;
    let yumi_test_actor: any;
    yumi_test_actor = await createYumiActor(yumi_test_cid);
    let collection_res: any;
    collection_res = await yumi_test_actor.createCollection(info);
    console.log("collection result ", collection_res)
    // return res;
}

// remove collection 
export const remove_shiku_collection = async (name: any) => {
    let pid = Principal.fromText("kkwoi-3jebw-6qx6z-yeah7-pgtlm-gbqdm-kkvyt-eqgbl-x3vpw-wfu2w-rqe");
    let yumi_test_cid: any;
    yumi_test_cid = boe.yumi;
    let yumi_test_actor: any;
    yumi_test_actor = await createYumiActor(yumi_test_cid);
    let collection_res: any;
    collection_res = await yumi_test_actor.removeCollection(pid, name);
    console.log("collection result ", collection_res)
    // return res;
}
//  yumi sell 
export const yumi_sell_controller = async (req: any, res: any, next: any) => {
    let yumi_test_cid: any;
    yumi_test_cid = boe.yumi;
    let yumi_test_actor: any;
    yumi_test_actor = await createYumiActor(yumi_test_cid);
    let sell_res: any;
    sell_res = await yumi_test_actor.sell({ tokenIdentifier: req.body.tid, price: req.body.price * 1e8 });
    console.log(" result ", sell_res)
    // return res;
}


export const sell_dutchaution_controller = async (req: any, res: any, next: any) => {
    let cid = req.body.canister
    let index = req.body.index
    let reduce_time = req.body.reduce_time
    let start_price = req.body.start_price
    let floor_price = req.body.floor_price
    let reduce_price = req.body.reduce_price
    let end_time = req.body.end_time
    try {
        let result = await sellDutchAuctionController(
            cid,
            index,
            start_price,
            floor_price,
            reduce_price,
            reduce_time,
            end_time
        )
        res.status(201).json({
            result: result
        })
    } catch (e) {
        console.log("error ", e)
        res.json({

        })
    }
    
    
}

export const sellDutchAuctionController = async (cid: any, index: any, startPrice: any, floorPrice: any, reducePrice: any, reduceTime: any, endTime: any) => {
        let date = new Date();
        let min = date.getMinutes();
        date.setMinutes(min + 1);
        let yumi_test_actor: any;
        // yumi_test_actor = await createYumiActor(boe.yumi);
        // let res = await yumi_test_actor.sellDutchAuction({
        //     startPrice: startPrice * 1e8, // 初始总价
        //     floorPrice: floorPrice * 1e8, // 最低总价
        //     startTime: date.getTime() * 1000000, // 拍卖开始时间
        //     // endTime: new Date('2022-11-20 12:00:00 GMT+8').getTime() * 1000000,
        //     endTime: ((date.getTime()) + 86400000 * endTime) * 1000000,// 时间+endTime天，拍卖结束时间
        //     reducePrice: reducePrice * 1e8, // 每次降的总价 reducePrice
        //     reduceTime: reduceTime * 60 * 1000 * 1000000, // reduceTime 分钟，降价时间
        //     tokenIdentifier: await tokenIdentifier(cid, index)
        // });
        return "success";
    }

export const importCollection = async (pid: any, cid: any) => {
    const info: any = {
        url: [''],
        featured: [''],
        logo: ['https://yuminftdata-1257009156.cos.ap-nanjing.myqcloud.com/images/005-01.png'],
        name: ['Shiku Chistry'],
        banner: [''],
        description: ['Shiku is a metaverse.'],
        links: [{
            'twitter': [''],
            'instagram': [''],
            'discord': [''],
            'telegram': [''],
            'medium': [''],
            'yoursite': ['']
        }],
        isVisible: true,
        royalties: 1,
        category: [''],
        releaseTime: [],
        openTime: [],
        standard: {ext: null},
    };
    let yumi_test_cid: any;
    yumi_test_cid = boe.yumi;
    let yumi_test_actor: any;
    yumi_test_actor = await createYumiActor(yumi_test_cid);
    let res = await yumi_test_actor.importCollection(Principal.fromText(pid), cid, info);
    console.log(res);
    return res;
}

// list yumi online collections 
export const list_collections_online = async (cid: any) => {
    // create yumi online actor
    let yumi_actor = await createYumiOnlineActor(cid);
    // get yumi online collections
    return yumi_actor.listCollections()
}

// list yumi nft information
export const list_nft_info = async (cid: string) => {
    // create yumi erc721 actor
    let yumi_erc721_actor = await createYumiErc721Actor(cid);
    // get nft tokens
    return yumi_erc721_actor.getTokens()
}

//query yumi platform fee
export const queryPlatformFee = async (uid: string) => {
    // create yumi online actor
    let yumi_online = await createYumiOnlineActor(uid);
    // query yumi platform fee
    let res = yumi_online.queryPlatformFee();
    return res;
}

export const compressImgYumi_controller = async (req: any, res: any, next: any) => {
    try {
        await compressImgYumi(req.body.filepath, req.body.filename, req.body.new_filename);
        res.status(201).json({
            result: "compress finised"
        })
    } catch (e) {
        console.log("error ", e)
        res.json({

        })
    }

}