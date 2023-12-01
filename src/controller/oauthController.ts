
import { TwitterApi } from 'twitter-api-v2';
import {
  user_profile_data_store_service,
  private_user_data_store_service,
  private_user_check_service,
  user_profile_data_find_one_service,
} from "./dataServiceController"
import { generatePid } from "./accountController"
import jwt from "jsonwebtoken";
import { CookieOptions, Response } from "express";
import { PrivateData } from '../entities/UserEntity';

const redis = require("../redis/redis")

const WEBSITE_URL = "http://bitask.club/"
const CALLBACK_URL = "http://bitask.club:3001/twitter/callback"

const cookieOptions: CookieOptions = {
  httpOnly: true,
}
// cookie name
const COOKIE_NAME = 'oauth2_token'
const JWT_SEC ="bitask"

function addCookieToRes(res: Response, id: any, accessToken: any) {
  
  const token = jwt.sign({ // Signing the token to send to client side
    id,
    accessToken,
  }, JWT_SEC);
  res.cookie(COOKIE_NAME, token, {  // adding the cookie to response here
    ...cookieOptions,
    expires: new Date(Date.now() + 7200 * 1000),
  });
}
export async function callback(req: any, res: any, next: any) {
  let private_user: any = {}
  let profile_user: any = {}
  const Client = new TwitterApi({ clientId: process.env.TWITTER_CLIENT_ID_NEW, clientSecret: process.env.TWITTER_CLIENT_SEC_NEW });
  const { state, code } = req.query;
  // Get the saved codeVerifier from session
  const data = await redis.get(state)
  await redis.del(state)
  const parsed_data = JSON.parse(data)
  const codeVerifier = parsed_data['codeVerifier']
  const sessionState = parsed_data['state']
  const private_data  = await generatePid()
  // console.log(req.session)
  // const { codeVerifier, sessionState } = req.session

  if (!codeVerifier || !state || !sessionState || !code) {
    return res.status(400).send('You denied the app or your session expired!');
  }
  if (state !== sessionState) {
    return res.status(400).send('Stored tokens didnt match!');
  }
  
  // https://developer.twitter.com/en/portal/projects/1721415199180345344/apps/28018309/auth-settings
  Client.loginWithOAuth2({ code, codeVerifier, redirectUri: CALLBACK_URL })
    .then(async ({ client: loggedClient, accessToken, refreshToken, expiresIn }) => {
      // {loggedClient} is an authenticated client in behalf of some user
      // Store {accessToken} somewhere, it will be valid until {expiresIn} is hit.
      // If you want to refresh your token later, store {refreshToken} (it is present if 'offline.access' has been given as scope)
      // console.log("access token ", accessToken)

      const { data: userObject } = await loggedClient.v2.me({ 'user.fields': ['public_metrics', 'description', 'profile_image_url' ]});
      const user = await private_user_check_service(userObject.id)
      if (user) {
        const profile_user = await user_profile_data_find_one_service(userObject.id)
        console.log(profile_user)
        
        addCookieToRes(res, userObject.id, accessToken)

        return res.redirect(WEBSITE_URL);

      } else {
        private_user = {
          twitter_id: userObject.id,
          icpAddress: private_data.icpAddress,
          account_id: private_data.account,
          phase: private_data.memory,
        }
        
        await private_user_data_store_service(private_user)
        console.log(private_user)
        profile_user = {
          icpAddress: private_data.icpAddress,
          twitter_id: userObject.id,
          username: userObject.username,
          name: userObject.name,
          description: userObject.description,
          profile_image_url: userObject.profile_image_url,
          followers_count: userObject.public_metrics.followers_count,
          following_count: userObject.public_metrics.following_count,
          tweet_count: userObject.public_metrics.tweet_count,
          listed_count: userObject.public_metrics.listed_count,
          like_count: 0,
          holder: 0,
          holding: 0,
          tvl: 0,
          tickets: 0,
        }
        addCookieToRes(res, userObject.id, accessToken)
        await user_profile_data_store_service(profile_user)
       
        // console.log(profile_user)
        return res.redirect(WEBSITE_URL);

      }
    })
    .catch((err: any) => {
      console.log("error ", err)
      res.status(403).send(err)
    });
}


export async function twitter(req: any, res: any, next: any) {
    try {
        // const Client = new TwitterApi({
        //   appKey: process.env.TWITTER_CONSUMER_KEY,
        //   appSecret: process.env.TWITTER_CONSUMER_SECRET,
        //   accessToken: process.env.TWITTER_ACCESS_KEY,
        //   accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
        // });
        // const Client = new TwitterApi(process.env.BEAR_TOKEN);
        const Client = new TwitterApi({ clientId: process.env.TWITTER_CLIENT_ID_NEW, clientSecret: process.env.TWITTER_CLIENT_SEC_NEW });
        const { url, codeVerifier, state } = Client.generateOAuth2AuthLink(CALLBACK_URL, { scope: ['tweet.read', 'users.read', 'offline.access'] });
        // console.log(url)
        // console.log(codeVerifier)
        // console.log(state)
        const data = {
          url,
          codeVerifier,
          state
        }
        await redis.set(state, JSON.stringify(data))
        
        let count = 0;
        // console.log(user)
        res.json({
            code: 20000,
            data: data.url
        })
        
    } catch (e) {
      console.log("error ", e)
      res.json({
        result: e
      })
    }
    
}
type UserJWTPayload = Pick<PrivateData, 'id'> & {accessToken: string}

export async function get_user(req: any, res: any, next: any) {
  try {
    console.log(req.cookies)
    const token = req.cookies[COOKIE_NAME];
    
    if (!token) {
      throw new Error("Not Authenticated");
    }
    const payload = jwt.verify(token, JWT_SEC) as UserJWTPayload;
    const userFromDb = await private_user_check_service(payload.id)
    if (!userFromDb) throw new Error("Not Authenticated");
    // if (userFromDb.type === "twitter") {
      if (!payload.accessToken) {
        throw new Error("Not Authenticated");
      }
      const twUser = await user_profile_data_find_one_service(payload.id);
    // }
    console.log(twUser)
    res.json({
      code: 20000,
      data: twUser,
    })
  } catch (err) {
    res.status(401).json("Not Authenticated")
  }
}