const redis = require("redis");

const redisClient = redis.createClient({
    url: 'redis://127.0.0.1:6379'
    // url: 'redis://'+process.env.REDIS_ADDRESS+':'+process.env.REDIS_PORT
});

const subscriber = redisClient.duplicate();
redisClient.on('error', (err:any) => {
    console.log("redis报错啦！！")
    console.log(err);
})

async function subscribe(channel: string, listener: void) {
    if(!subscriber.isOpen){
        await subscriber.connect();
    }
    subscriber.subscribe(channel, listener);
}

async function publish (channel:string, message: any) {
    if(!redisClient.isOpen) {
        await redisClient.connect();
    }
    await redisClient.publish(channel, message);
}

async function set (key:string, val:any, expires:any) {
    if(!redisClient.isOpen) {
        await redisClient.connect();
    }
    if (typeof val === 'object') {
        val = JSON.stringify(val)
    }
    await redisClient.set(key, val, redis.print);
    if(expires && typeof expires === 'number') {
        redisClient.expire(key, expires);
    }
}

async function get (key:string) {
    if(!redisClient.isOpen) {
        await redisClient.connect();
    }
    return await redisClient.get(key);
}

async function del(key:string) {
    if(!redisClient.isOpen) {
        await redisClient.connect();
    }
    await redisClient.del(key);
}

async function hset (key:string, field: string, val:any, expires:any) {
    if(!redisClient.isOpen) {
        await redisClient.connect();
    }
    if (typeof val === 'object') {
        val = JSON.stringify(val)
    }
    await redisClient.hSet(key, field, val, redis.print);
    if(expires && typeof expires === 'number') {
        redisClient.expire(key, expires);
    }
}
async function lpush(key: string, val: any) {
    if(!redisClient.isOpen) {
        await redisClient.connect()
    }
    if (typeof val === 'object') {
        val = JSON.stringify(val)
    }
    await redisClient.lPush(key, val)
}

async function rpop(key: string) {
    if(!redisClient.isOpen) {
        await redisClient.connect()
    }
    await redisClient.rPop(key, 0)
}
async function hget (key:string, field: string) {
    if(!redisClient.isOpen) {
        await redisClient.connect();
    }
    return await redisClient.hGet(key, field);
}

async function hgetall (key:string) {
    if(!redisClient.isOpen) {
        await redisClient.connect();
    }
    let val = await redisClient.hGetAll(key);
    return JSON.parse(JSON.stringify(val));
}

async function hkeys (key:string) {
    if(!redisClient.isOpen) {
        await redisClient.connect();
    }
    return await redisClient.hKeys(key);
}

async function hdel(key:string, field: string) {
    if(!redisClient.isOpen) {
        await redisClient.connect();
    }
    await redisClient.hDel(key, field);
}

module.exports = { lpush, rpop, set, get, del, hset, hget, hgetall, hkeys, hdel, subscribe, publish }