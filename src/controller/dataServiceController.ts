import { DI } from "../config/database.config";
import { PrivateData } from "../entities/UserEntity";
import { ProfileData } from "../entities/ProfileEntity";
import { Question } from "../entities/QuestionEntity";
import { Answer } from "../entities/AnswerEntity";
import { Comment } from "../entities/CommentsEntity";
import { QueryOrderNumeric } from "@mikro-orm/core";

export const user_profile_data_store_service = async (quers_user: any) => {

    const UserProfileRepo = DI.em.fork().getRepository(ProfileData);
    let user = UserProfileRepo.create({
        icpAddress: quers_user.icpAddress,
        twitter_id: quers_user.twitter_id,
        username: quers_user.username,
        name: quers_user.name,
        description: quers_user.description,
        followers_count: quers_user.followers_count,
        following_count: quers_user.following_count,
        tweet_count: quers_user.tweet_count,
        listed_count: quers_user.tweet_count,
        profile_image_url: quers_user.profile_image_url,
        like_count: quers_user.like_count,
        holder: 0,
        holding: 0,
        tvl: 0,
        tickets: 0,
    });
    console.log("profile ", user)
    await UserProfileRepo.getEntityManager().persistAndFlush(user);
}

export async function question_check_service(question_id: string) {
    const QuestionRepo = DI.em.fork().getRepository(Question);
    const question = await QuestionRepo.findOne({question_id: question_id})
    if (question) {
        return true 
    } else {
        return false
    }
}

export async function question_find_service_by_time(num: any, limit: any) {
    // let limit = 5
    // let num = 2
    const QuestionRepo = DI.em.fork().getRepository(Question);
    const question = await QuestionRepo.find({}, {
        populate: ['question_date'],
        limit: limit,
        offset: num,
        orderBy: { question_date: QueryOrderNumeric.DESC},

    })
    return question
    
}

export async function question_del_service() {
    const QuestionRepo = DI.em.fork().getRepository(Question);
    const question = await QuestionRepo.findAll()
    QuestionRepo.getEntityManager().removeAndFlush(question)
    console.log("question del done")
}

export async function question_list_backup_service(question_list: any)  {
    const QuestionRepo = DI.em.fork().getRepository(Question);
    let question = QuestionRepo.create({
        question_id: question_list.question_id,
        question_title: question_list.question_title,
        question_description: question_list.question_description,
        question_date: question_list.question_date,
        question_asker: question_list.question_asker,
        question_logo: question_list.question_logo,
        question_image: question_list.question_image,
        answers: question_list.answers,
        tags: question_list.tags,
        down_thumb: question_list.down_thumb,
        up_thumb: question_list.up_thumb,
    })
    // console.log("question ", question)
    await QuestionRepo.getEntityManager().persistAndFlush(question)
}



export const user_profile_data_find_one_service = async (user_id: any) => {

    const UserProfileRepo = DI.em.fork().getRepository(ProfileData);
    const user = await UserProfileRepo.findOne({twitter_id: user_id});
    return user
}

export const user_profile_data_del_service = async (req: any, res: any, next: any) => {

    const UserProfileRepo = DI.em.fork().getRepository(ProfileData);
    const user = await UserProfileRepo.findAll();
    UserProfileRepo.getEntityManager().removeAndFlush(user)
    console.log(user)
        res.json({
            code: 20000,
            data: "del done",
        })
}

export const user_profile_data_find_all_service = async (req: any, res: any, next: any) => {

    const UserProfileRepo = DI.em.fork().getRepository(ProfileData);
    const user = await UserProfileRepo.findAll();
    console.log(user)
        res.json({
            code: 20000,
            data: user,
        })
}


export const private_user_data_store_service = async (quers_user: any) => {

    const UserRepo = DI.em.fork().getRepository(PrivateData);
    let user = UserRepo.create({
        twitter_id: quers_user.twitter_id,
        icpAddress: quers_user.icpAddress,
        account_id: quers_user.account_id,
        phase: quers_user.phase,
    });
    await UserRepo.getEntityManager().persistAndFlush(user);
}

export const private_user_del_all_service = async (req: any, res: any, next: any) => {
    try {
        let user: any;
        const UserRepo = DI.em.fork().getRepository(PrivateData);
        user = await UserRepo.findAll();
        UserRepo.getEntityManager().removeAndFlush(user)
        console.log(user)
        res.json({
            code: 20000,
            data: "del done",
        })
    } catch (e) {
        console.log("err ", e);
    }
    
}


export const private_user_find_all_service = async (req: any, res: any, next: any) => {
    try {
        let user: any;
        const UserRepo = DI.em.fork().getRepository(PrivateData);
        user = await UserRepo.findAll();
        console.log(user)
        res.json({
            code: 20000,
            data: user,
        })
    } catch (e) {
        console.log("err ", e);
    }
    
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



