import { DI } from "../config/database.config";
import { YumiNft } from "../entities/NftEntity";
import { YumiNftTest } from "../entities/NftEntityTest";
import { ShikuNftOwner } from "../entities/NftOwnerEntity";
import { icWalletUser } from "../entities/UserEntity";

export const shiku_wallet_nft_data_owner_create_service = async (nft_data: any) => {

    const shikuNftRepo = DI.em.fork().getRepository(ShikuNftOwner);
    let nft = shikuNftRepo.create({
        owner: nft_data.pid,
        tokenid: nft_data.tokenid,
    });
    await shikuNftRepo.getEntityManager().persistAndFlush(nft);
}

export const shiku_wallet_nft_data_owner_search_service = async (tokenid: any) => {
    let nft: any;
    let nft_new: any;
    const shikuNftRepo = DI.em.fork().getRepository(ShikuNftOwner);
    const nft_sort = {_id: -1};
    const limit = 1;
    nft = await shikuNftRepo.find({tokenid: tokenid});
    nft_new = nft.at(-1).owner;
    console.log(nft_new)
    return nft_new;
}

export const shiku_wallet_user_data_service = async (shiku_user: any) => {

    const icWalletUserRepo = DI.em.fork().getRepository(icWalletUser);
    let user = icWalletUserRepo.create({
        icpAddress: shiku_user.pid,
        account_id: shiku_user.account,
        phase: shiku_user.memory,
    });
    await icWalletUserRepo.getEntityManager().persistAndFlush(user);
}

export const shiku_wallet_user_phase_find_service = async (shiku_user_pid: any) => {
    try {
        let user: any;
        const icWalletUserRepo = DI.em.fork().getRepository(icWalletUser);
        user = await icWalletUserRepo.findOne({icpAddress: shiku_user_pid});
        return user.phase
    } catch (e) {
        console.log("err ", e);
    }
    
}

export const shiku_wallet_user_nft_data_delete_service_controller = async (req: any, res: any, next: any) => {
    const yumiNftRepo = DI.em.fork().getRepository(YumiNft);
    let usernft = await yumiNftRepo.find({owner: req.body.pid});
    await yumiNftRepo.nativeDelete(usernft);
    res.status(201).json({
        result: "delete done"
    })
}

export const shiku_wallet_user_nft_data_delete_all_service_controller = async (req: any, res: any, next: any) => {
    const yumiNftRepo = DI.em.fork().getRepository(YumiNft);
    let usernft = await yumiNftRepo.findAll({});
    await yumiNftRepo.nativeDelete(usernft);
    res.status(201).json({
        result: "delete done"
    })
}

export const shiku_wallet_user_nft_data_delete_all_service_controller_test = async (req: any, res: any, next: any) => {
    const yumiNftRepo = DI.em.fork().getRepository(YumiNftTest);
    let usernft = await yumiNftRepo.findAll({});
    await yumiNftRepo.nativeDelete(usernft);
    res.status(201).json({
        result: "delete done"
    })
}

export const shiku_wallet_user_nft_data_delete_service_controller_test = async (req: any, res: any, next: any) => {
    const yumiNftRepo = DI.em.fork().getRepository(YumiNftTest);
    let usernft = await yumiNftRepo.find({owner: req.body.pid});
    await yumiNftRepo.nativeDelete(usernft);
    res.status(201).json({
        result: "delete done"
    })
}

export const shiku_wallet_user_nft_data_insert_service = async (yumi_nft: any) => {
    const yumiNftRepo = DI.em.fork().getRepository(YumiNft);
    let nft_data: any;
    nft_data = await yumiNftRepo.findOne({token: yumi_nft.token, tokenid: yumi_nft.tokenid});
    if (nft_data) {
        console.log("nft already existed, return ")
        return
    } else {
        console.log("nft insert ")

        let user_nft = yumiNftRepo.create({
            icpAddress: yumi_nft.icpAddress,
            owner: yumi_nft.owner,
            tokenid: yumi_nft.tokenid,
            url: yumi_nft.url,
            name: yumi_nft.name,
            price: yumi_nft.price,
            collection: yumi_nft.collection,
            token: yumi_nft.token,
        });
        console.log(user_nft)
        await yumiNftRepo.getEntityManager().persistAndFlush(user_nft);
    }
    
    
}

export const shiku_wallet_user_nft_data_insert_service_test = async (yumi_nft: any) => {
    let nft_data: any;
    const yumiNftRepo = DI.em.fork().getRepository(YumiNftTest);
    nft_data = await yumiNftRepo.findOne({token: yumi_nft.token, tokenid: yumi_nft.tokenid});
    if (nft_data) {
        console.log("nft already existed, return ")
        return
    } else {
        console.log("nft insert ")

        let user_nft = yumiNftRepo.create({
            icpAddress: yumi_nft.icpAddress,
            owner: yumi_nft.owner,
            tokenid: yumi_nft.tokenid,
            url: yumi_nft.url,
            name: yumi_nft.name,
            price: yumi_nft.price,
            collection: yumi_nft.collection,
            token: yumi_nft.token,
        });
        console.log(user_nft)
        await yumiNftRepo.getEntityManager().persistAndFlush(user_nft);
    }
}
// export const shiku_wallet_user_nft_data_update_service = async () => {
//     const yumiNftRepo = DI.em.fork().getRepository(YumiNft);
    
//     await yumiNftRepo.flush();
    
// }

export const shiku_wallet_user_nft_data_find_one_service = async (icpAddress: any) => {
    
    const yumiNftRepo = DI.em.fork().getRepository(YumiNft);
    let res = await yumiNftRepo.findOne({icpAddress: icpAddress});
    return res
}

export const shiku_wallet_user_nft_data_find_all_service = async (icpAddress: any) => {
    const yumiNftRepo = DI.em.fork().getRepository(YumiNft);
    let res = await yumiNftRepo.find({icpAddress: icpAddress});
    // console.log(res)
    return res
}

export const shiku_wallet_user_nft_data_find_owner_service = async (tokenid: any) => {
    const yumiNftRepo = DI.em.fork().getRepository(YumiNft);
    let nft_res: any;
    let owner: any;
    nft_res = await yumiNftRepo.findOne({tokenid: tokenid});
    owner = nft_res.owner;
    return owner
}

export const shiku_wallet_user_nft_data_remove_by_tokenid_service = async (tokenid: any) => {
    const yumiNftRepo = DI.em.fork().getRepository(YumiNft);
    let nft_data: any;
    nft_data = await yumiNftRepo.find({tokenid: tokenid});
    console.log("remove")
    await yumiNftRepo.nativeDelete(nft_data);
}

export const shiku_wallet_user_nft_data_find_one_service_test = async (icpAddress: any) => {
    const yumiNftRepo = DI.em.fork().getRepository(YumiNftTest);
    let res = await yumiNftRepo.findOne({icpAddress: icpAddress});
    return res
}

export const shiku_wallet_user_nft_data_find_all_service_test = async (icpAddress: any) => {
    const yumiNftRepo = DI.em.fork().getRepository(YumiNftTest);
    let res = await yumiNftRepo.find({icpAddress: icpAddress});
    // console.log(res)
    return res
}

export const shiku_wallet_user_nft_data_find_owner_service_test = async (tokenid: any) => {
    const yumiNftRepo = DI.em.fork().getRepository(YumiNftTest);
    let nft_res: any;
    let owner: any;
    nft_res = await yumiNftRepo.findOne({tokenid: tokenid});
    owner = nft_res.owner;
    return owner
}

export const shiku_wallet_user_nft_data_remove_by_tokenid_service_test = async (tokenid: any) => {
    const yumiNftRepo = DI.em.fork().getRepository(YumiNftTest);
    let nft_data: any;
    nft_data = await yumiNftRepo.find({tokenid: tokenid});
    console.log("remove")
    await yumiNftRepo.nativeDelete(nft_data);
}