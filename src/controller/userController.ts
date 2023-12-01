import { Principal } from '@dfinity/principal';
import { generateMnemonic } from "bip39";
import {
    mnemonicWord
} from "../utils/config";
import {
    fromHexString,
    getAccountId,
    to32bits,
} from "../utils/crypto";
import {
    getIdentityFromSeed,
} from "../utils/identity";
import {
    createUserActor
} from "./actorController";

export async function get_user_profile_controller(req: any, res: any, next: any) {
    try {
        createUserActor().then((actor: any) => {
            actor.get_user_profile({owner: Principal.fromText(req.body.owner)}).then((result: any) => {
                console.log("result ", result)
                res.json({
                    code: 20000,
                    data: result.Success,
                })
            })
        })
    } catch (e) {
        console.log("error ", e)
        res.json({
            result: e
        })
    }
}

export async function update_profile_description_controller(req: any, res: any, next: any) {
    try {
        createUserActor().then((actor: any) => {
            actor.update_profile_description({
                owner: Principal.fromText(req.body.owner),
                description: req.body.description,
            }).then((result: any) => {
                console.log("result ", result)
                res.json({
                    code: 20000,
                    data: result,
                })
            })
        })
    } catch (e) {
        console.log("error ", e)
        res.json({
            result: e
        })
    }
}

export async function update_user_followers_controller(req: any, res: any, next: any) {
    try {
        createUserActor().then((actor: any) => {
            actor.update_user_followers({
                owner: Principal.fromText(req.body.owner),
                followers: parseInt(req.body.followers),
            }).then((result: any) => {
                console.log("result ", result)
                res.json({
                    code: 20000,
                    data: result,
                })
            })
        })
    } catch (e) {
        console.log("error ", e)
        res.json({
            result: e
        })
    }
}


export async function update_user_holders_controller(req: any, res: any, next: any) {
    try {
        createUserActor().then((actor: any) => {
            actor.update_user_holders({
                owner: Principal.fromText(req.body.owner),
                holders: parseInt(req.body.holders),
            }).then((result: any) => {
                console.log("result ", result)
                res.json({
                    code: 20000,
                    data: result,
                })
            })
        })
    } catch (e) {
        console.log("error ", e)
        res.json({
            result: e
        })
    }
}

export async function update_user_holding_controller(req: any, res: any, next: any) {
    try {
        createUserActor().then((actor: any) => {
            actor.update_user_holding({
                owner: Principal.fromText(req.body.owner),
                holding: parseInt(req.body.holding),
            }).then((result: any) => {
                console.log("result ", result)
                res.json({
                    code: 20000,
                    data: result,
                })
            })
        })
    } catch (e) {
        console.log("error ", e)
        res.json({
            result: e
        })
    }
}


export async function update_user_tvl_controller(req: any, res: any, next: any) {
    try {
        createUserActor().then((actor: any) => {
            actor.update_user_tvl({
                owner: Principal.fromText(req.body.owner),
                tvl: parseInt(req.body.tvl),
            }).then((result: any) => {
                console.log("result ", result)
                res.json({
                    code: 20000,
                    data: result,
                })
            })
        })
    } catch (e) {
        console.log("error ", e)
        res.json({
            result: e
        })
    }
}

export async function set_user_principal(req:any, res: any, next: any) {
    try {
        let principal = req.body.principal
        createUserActor().then((actor: any) => {
            actor.set_user_principal({
                owner: Principal.fromText(principal),
            }).then((result: any) => {
                console.log("result ", result)
                res.json({
                    code: 20000,
                    data: result,
                })
            })
        })
    } catch (err) {
        console.log("error ", err)
        res.json({
            result: err
        })
    }
}


export async function update_username(req:any, res: any, next: any) {
    try {
        let owner = req.body.owner
        let username = req.body.username
        createUserActor().then((actor: any) => {
            actor.update_username({
                owner: Principal.fromText(owner),
                username: username,
            }).then((result: any) => {
                console.log("result ", result)
                res.json({
                    code: 20000,
                    data: result,
                })
            })
        })
    } catch (err) {
        console.log("error ", err)
        res.json({
            result: err
        })
    }
}

export async function update_name(req:any, res: any, next: any) {
    try {
        let name = req.body.name
        let owner = req.body.owner

        createUserActor().then((actor: any) => {
            actor.update_name({
                owner: Principal.fromText(owner),
                name: name,
            }).then((result: any) => {
                console.log("result ", result)
                res.json({
                    code: 20000,
                    data: result,
                })
            })
        })
    } catch (err) {
        console.log("error ", err)
        res.json({
            result: err
        })
    }
}

export async function get_user_followers(req:any, res: any, next: any) {
    try {
        let owner = req.body.owner

        createUserActor().then((actor: any) => {
            actor.get_user_followers({
                owner: Principal.fromText(owner),
            }).then((result: any) => {
                console.log("result ", result.Success)
                res.json({
                    code: 20000,
                    data: result.Success,
                })
            })
        })
    } catch (err) {
        console.log("error ", err)
        res.json({
            result: err
        })
    }
}

