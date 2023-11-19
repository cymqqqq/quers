import { DI } from "../config/database.config";
import { PrivateData } from "../entities/UserEntity";
import { ProfileData } from "../entities/ProfileEntity";


export const user_profile_data_store_service = async (quers_user: any) => {

    const UserProfileRepo = DI.em.fork().getRepository(ProfileData);
    let user = UserProfileRepo.create({
        icpAddress: quers_user.principal,
        twitter_id: quers_user.twitter_id,
        username: quers_user.username,
        name: quers_user.name,
        description: quers_user.description,
        followers_count: quers_user.followers_count,
        following_count: quers_user.following_count,
        tweet_count: quers_user.tweet_count,
        listed_count: quers_user.tweet_count,
        like_count: quers_user.like_count,
        holder: 0,
        holding: 0,
        tvl: 0,
        tickets: 0,
    });
    await UserProfileRepo.getEntityManager().persistAndFlush(user);
}

export const user_profile_data_find_one_service = async (user_id: any) => {

    const UserProfileRepo = DI.em.fork().getRepository(ProfileData);
    const user = await UserProfileRepo.findOne({twitter_id: user_id});
    return user
}

export const private_user_data_store_service = async (quers_user: any) => {

    const UserRepo = DI.em.fork().getRepository(PrivateData);
    let user = UserRepo.create({
        twitter_id: quers_user.twitter_id,
        icpAddress: quers_user.principal,
        account_id: quers_user.account_id,
        phase: quers_user.phase,
    });
    await UserRepo.getEntityManager().persistAndFlush(user);
}

export const private_user_check_service = async (twitter_id: any) => {
    try {
        let user: any;
        const UserRepo = DI.em.fork().getRepository(PrivateData);
        user = await UserRepo.findOne({twitter_id: twitter_id});
        if (user) {
            return true
        } else {
            return false
        }
    } catch (e) {
        console.log("err ", e);
    }
    
}



