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
import oauthRoutes from "./routes/oauthRoutes";
import userRoutes from "./routes/userRoutes";

require('dotenv').config({ path: 'development.env' });

var swaggerInstall = require("./config/swagger");
import express from  "express";
import { ConsulConfig } from './consul/consult.config';

var app = express();
require('dotenv').config({ path: 'development.env' });

import { connect } from './config/database.config';
connect().then(async () => {
    console.log(`*** Connected to Database! ***`);
});


import { boe, online } from "./utils/config";
import { twitter } from "./controller/oauthController";
import { createUserActor } from "./controller/actorController";
// let pid = "kkwoi-3jebw-6qx6z-yeah7-pgtlm-gbqdm-kkvyt-eqgbl-x3vpw-wfu2w-rqe"

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use('/health', async function (req, res, next) {
    // await redis.set("test", 10, 10);
    res.json('OK');
});
app.use('/account', accountRoutes);
app.use('/twitter', oauthRoutes);
app.use('/user', userRoutes);


// console.log("服务器启动端口", process.env.SERVER_PORT);
console.log("服务器启动端口", process.env.SERVER_PORT);

app.listen(process.env.SERVER_PORT || 3000);
// ConsulConfig.init();
// ConsulConfig.register();
app.all('*', (req, res, next) => {
    // console.log("解决跨域");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Request-Method", "PUT,POST,GET,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    // res.setHeader("content-type", "text/html; charset=utf-8");
    next();
})
swaggerInstall(app);
