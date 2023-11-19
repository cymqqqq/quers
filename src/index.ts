console.log("启动程序");

import accountRoutes from "./routes/accountRoutes";
import oauthRoutes from "./routes/oauthRoutes";
import userRoutes from "./routes/userRoutes";
import homepageRoutes from "./routes/homepageRoutes";
import answerRoutes from "./routes/answerRoutes";
import commentRoutes from "./routes/commentRoutes";

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
var cors=require("cors");

app.use(cors()); 
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
app.use('/homepage', homepageRoutes);
app.use('/answer', answerRoutes);
app.use('/comment', commentRoutes);


// g5fwl-3aaaa-aaaah-adtlq-cai-1

// console.log("服务器启动端口", process.env.SERVER_PORT);
console.log("服务器启动端口", process.env.SERVER_PORT);

app.listen(process.env.SERVER_PORT || 3000);
// ConsulConfig.init();
// ConsulConfig.register();
app.all('*', (req, res, next) => {
    // console.log("解决跨域");
    // res.setHeader("Access-Control-Allow-Credentials", true)
    // res.setHeader("Access-Control-Allow-Origin", "*");
    // res.setHeader("Access-Control-Request-Method", "PUT,POST,GET,DELETE");
    // res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    // res.setHeader("content-type", "text/html; charset=utf-8");
    res.set({
        'Access-Control-Allow-Credentials': true, //允许后端发送cookie
        'Access-Control-Allow-Origin':  '*', //任意域名都可以访问,或者基于我请求头里面的域
        'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type', //设置请求头格式和类型
        'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',//允许支持的请求方式
        'Content-Type': 'application/json; charset=utf-8'//默认与允许的文本格式json和编码格式
      })
    next();
})
swaggerInstall(app);
