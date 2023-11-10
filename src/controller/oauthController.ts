// const OAuth = require('oauth')
// const { promisify } = require('util')
import { Client } from "twitter-api-sdk";
export async function twitter(req: any, res: any, next: any) {
    try {
        const client = new Client(process.env.TWITTER_ACCESS_TOKEN_SECRET as string);
        const { data } = await client.users.findUserByUsername(req.body.username);
        if (!data) throw new Error("Couldn't find user");
        let count = 0;
        console.log(data.id)
        res.json({
            code: 20000,
            result: data.id
        })
        
    } catch (e) {
      console.log("error ", e)
      res.json({
        result: e
      })
    }
    
}