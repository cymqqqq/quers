const Consul = require('consul');
const axios = require('axios');
require('dotenv').config({ path: 'consul-ic-wallet-server/development.env' });
export const ConsulConfig = {
    consul: Consul,
    init() {
        const serviceName = 'consul-demo';

        // 初始化 consul
        this.consul = new Consul({
            host: process.env.CONSUL_HOST,
            port: process.env.CONSUL_PORT,
            promisify: true,
        });

        
    },
    
    async register() {
        if(!this.consul) {
            this.init();
        }
        // 服务注册与健康检查配置
        this.consul.agent.service.register({
            name: process.env.SERVER_NAME,
            address: process.env.SERVER_ADDRESS, // 注意：192.168.20.193 为我本地的内网 ip，通过 ifconfig 查看
            port: parseInt(process.env.SERVER_PORT),
            check: {
                http: 'http://'+process.env.SERVER_ADDRESS+':'+process.env.SERVER_PORT+'/health',
                interval: '10s',
                timeout: '5s',
            }
        }, function(err: any, result: any) {
            if (err) {
                console.error(err);
                throw err;
            }
        })   
    },

    async getConfig(key: any) {
        if(!this.consul) {
            this.init();
        }

        const result = await this.consul.kv.get(key);

        if (!result) {
            return Promise.reject(key + '不存在');
        }

        return JSON.parse(result.Value);
    },

    // 读取 user 配置简单封装
    async getUserConfig(key: any) {
        if(!this.consul) {
            this.init();
        }
        const result = await this.getConfig('develop/user');

        if (!key) {
            return result;
        }

        return result[key];
    },

    // 更新 user 配置简单封装
    async setUserConfig(key: any, val: any) {
        if(!this.consul) {
            this.init();
        }
        const user = await this.getConfig('develop/user');

        user[key] = val;

        return this.consul.kv.set('develop/user', JSON.stringify(user))
    },

    async getlist() {  
        if(!this.consul) {
            this.init();
        }
        let list = await this.consul.catalog.service.nodes({service:"user-server"});
        console.log("服务列表");
        console.log(list);
        var test = list['test'];
        if (test) {
            console.log(test.host)  
        }
    },

    async reqServerUrl(servername: string, url: string, data: any, method: string = 'get') {
        if(!this.consul) {
            this.init();
        }
        let list = await this.consul.catalog.service.nodes({service: servername});
        let server = [];
        console.log("服务列表");
        console.log(list);
        for(var i=0; i < list.length; i++) {
            console.log(list[i]);
            server.push({ address: list[i].ServiceAddress, port: list[i].ServicePort});
        }
        console.log(server);
        const randIndex = parseInt((Math.random() * list.length).toString());
        console.log(randIndex);
        let res = await axios({
            method: method,
            url: 'http://'+server[randIndex].address+":"+server[randIndex].port+url,
            data: data
        })
        // console.log("返回结果", res);
        if(res.data) {
            return res.data;
        }
    }
}