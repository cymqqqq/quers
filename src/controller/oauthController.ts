// const OAuth = require('oauth')
// const { promisify } = require('util')
import { TwitterApi } from 'twitter-api-v2';
// import { Client } from "twitter-api-sdk";

export async function twitter(req: any, res: any, next: any) {
    try {
        const Client = new TwitterApi({
          appKey: process.env.TWITTER_CONSUMER_KEY,
          appSecret: process.env.TWITTER_CONSUMER_SECRET,
          accessToken: process.env.TWITTER_ACCESS_KEY,
          accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
        });
        // const client = new TwitterApi(process.env.BEAR_TOKEN);

        let rwClient = Client.readWrite

        const user = await rwClient.v2.userByUsername(req.body.username)
        if (!user) throw new Error("Couldn't find user");
        let count = 0;
        console.log(user)
        res.json({
            code: 20000,
            result: user
        })
        
    } catch (e) {
      console.log("error ", e)
      res.json({
        result: e
      })
    }
    
}