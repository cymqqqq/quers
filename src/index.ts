console.log("启动程序");

// const Consul = require('consul');
// const consul = new Consul({ host: 'localhost', port: 8500, promisify: true, });
// console.log(consul);

// async function deregister() {
//     await consul.agent.service.deregister("test");
// }

// async function list() {
//     let list = await consul.agent.service.list();
//     console.log("服务列表");
//     console.log(list);
//     var test = list['test'];
//     if(test) {
//         console.log(test.host)
//     }
// }

// list();
// import  {connectRedis} from "./redis/redis";
import accountRoutes from "./routes/accountRoutes";

require('dotenv').config({ path: 'development.env' });

var swaggerInstall = require("./config/swagger");
import express from  "express";
import { ConsulConfig } from './consul/consult.config';

var app = express();
require('dotenv').config({ path: 'development.env' });

import { connect } from './config/database.config';
import { Principal } from "@dfinity/principal";
import { getAccountId, toHexString } from "./utils/crypto";
connect().then(async () => {
    console.log(`*** Connected to Database! ***`);
});
// let param :any;
// param = Uint8Array.from([170,239,190,14,115,140,133,11,107,66,82,42,164,96,81,184,190,197,25,95,145,124,71,25,140,104,8,242,102,78,3,63])
let pid : any;
// pid = Principal.fromText("eena5-dz3o5-3gtmw-5qap4-mv5rl-x76wy-q37tc-qnx2r-cmtik-dl62e-wqe");

// pid = Principal.fromText("ullmf-rgwee-vgbvu-e54b5-zhow3-ycslh-iiohn-acfpv-qnalc-34xas-gqe");
pid = Principal.fromText("4uvsa-7fqoo-g5cma-3w24a-me5eu-hl2fe-d7uyc-ubly6-rnm2r-n4tk6-eqe")
let arr: any
// arr = pid.toUint8Array();
// let yumeng: any
// yumeng = Uint8Array.from(arr);
// let yp: any;
// yp = Principal.fromUint8Array(yumeng);
console.log(pid.toString())
console.log(getAccountId(pid));
// console.log(pid.toString());
// console.log(pid.toUint8Array())
// console.log(Principal.fromUint8Array(param).toString());

import { boe, online } from "./utils/config";
// create_shiku_collection()
// remove_shiku_collection("ysevz-xyaaa-aaaah-adj7a-cai")
// (cid: any, index: any, tokenIndex: any, startPrice: any, floorPrice: any, reducePrice: any, receivablesAccount: any)

// let pid = "kkwoi-3jebw-6qx6z-yeah7-pgtlm-gbqdm-kkvyt-eqgbl-x3vpw-wfu2w-rqe"
let cid = online.shiku_lands_test
// nftInfo(cid, 23)
// importCollection(pid, cid)
// sellDutchAuctionController(cid, 23,0 , 10, 1, 1, null)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use('/health', async function (req, res, next) {
    // await redis.set("test", 10, 10);
    res.json('OK');
});
app.use('/account', accountRoutes);

// app.use('/shiku_test_token', shikuTestTokenRoutes);
// console.log("服务器启动端口", process.env.SERVER_PORT);
console.log("服务器启动端口", process.env.SERVER_PORT);

app.listen(process.env.SERVER_PORT || 3000);
ConsulConfig.init();
ConsulConfig.register();
app.all('*', (req, res, next) => {
    // console.log("解决跨域");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Request-Method", "PUT,POST,GET,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    // res.setHeader("content-type", "text/html; charset=utf-8");
    next();
})
swaggerInstall(app);
