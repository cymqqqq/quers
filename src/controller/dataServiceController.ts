import { DI } from "../config/database.config";
import { icWalletUser } from "../entities/UserEntity";



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



