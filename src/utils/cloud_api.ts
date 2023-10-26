
const COS = require('cos-nodejs-sdk-v5');
const fs = require('fs');
// const os = require('os');
const https = require('https');
const sharp = require('sharp');
const request = require('request');
const axios = require('axios');
const redis = require('../redis/redis');
export const getImageAxios = async (imageUrl: any, new_filename: any, roomId: any, index: any, protocolId: any, item: any, link: any) => {
    // get old filename by split image url
    const filename = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
    // get current dir path
    let dir = process.cwd();
    // let md5 = require("md5");
    // set up filepath 
    var filepath = dir + '/' + process.env.DIR;
    (async () => {

        const res = await axios.get(imageUrl, {
            responseType: 'arraybuffer', // notes: arraybuffer is required
        });
        // write image file to server
        fs.writeFileSync(filepath + '/' + filename, res.data);
        // compress image
        await compressImg(filename, new_filename);
        // upload file to tecent cloud
        uploadFile(new_filename, roomId, index, protocolId, item, link, imageUrl);
    })();
}

export const getImage = (imageUrl: any) => {
    const filename = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
    // var imageName = path.parse(imageUrl).base;
    let dir = process.cwd() + '/' + process.env.DIR;
    let new_filename = 'new_' + filename;
    var stream = fs.createWriteStream(dir + '/' + filename);
    https.get(imageUrl, function (res: any) {
        res.pipe(stream);
        console.log(filename + '  download completed');

    });



}

// time delay function 
export const sleep = (delay: any) => {
    var start = (new Date()).getTime();
    while ((new Date()).getTime() - start < delay) {
        continue;
    }
}

export const downloadImage = (imageUrl: any) => {
    const filename = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
    let dir = process.cwd();
    var filepath = dir + '/' + process.env.DIR;
    let new_filename = 'new_' + filename;

    // await compressImg(filepath, filename)
    // let new_url = await uploadFile(new_filename);
    https.get(imageUrl, (res: any) => {
        let imgData = "";
        res.setEncoding("binary");
        res.on('data', (chunk: any) => {
            imgData += chunk;
            fs.writeFileSync(filepath + '/' + filename, imgData, "binary", { mode: '777' });
        });
        res.on('end', async () => {

            // fs.writeFileSync(filepath+'/'+filename, imgData, "binary", { mode: '777' });
            // await compressImg(filename);
            console.log("compress finished")
            console.log(filepath + '/' + filename)
            //  uploadFile(new_filename);
            console.log('ok');
        });

    });


}
// upload file function
export const uploadFile = (filename: any, roomId: any, index: any, protocolId: any, item: any, link: any, imageUrl: any) => {
    // console.log(item);
    // set up COS client
    var cos = new COS({
        SecretId: process.env.SecretId,
        SecretKey: process.env.SecretKey,
    });
    // get current dir path
    let dir = process.cwd();
    var filepath = dir + '/' + process.env.DIR;
    let md5 = require("md5");
    let new_filename = 'new_' + md5(imageUrl) + '.jpg';
    // console.log(filename)
    // upload image file to tecent cloud
    cos.putObject({
        Bucket: process.env.Bucket,                        /* 必须 */
        Region: process.env.Region,                        /* 必须 */
        Key: 'images' + '/' + filename,                           /* 必须 */
        Body: fs.createReadStream(filepath + '/' + filename),           /* 必须 */
        onProgress: function (progressData: any) {
            console.log(progressData);
        },
    }, async function (err: any, data: any) {
        if (err) {
            console.log(err);
        } else {
            console.log("upload finished");

            let itemInfo: any = {
                link: link,
                state: 1,
                name: item.metadata.name,
                sourceUrl: item.sourceUrl ? item.sourceUrl : "",
                thumb: item.metadata.thumb,
                mimeType: item.metadata.mimeType,
                listPrice: item.price,
                desc: item.description
            }
            if (index != "noIdentifier") {
                itemInfo.identifier = index;
            }
            let command : any;
            if (index != "ClothingYumiNFTRequest") {
                command = {
                    command: "broadcast",
                    account: true,
                    role: true,
                    roomId: roomId,
                    self: true,
                    userId: "",
                    protocol: protocolId,
                    sendMessage: {
                        item: itemInfo
                    }
                }
            } else {
                let rep = {
                    thumb: item.metadata.thumb,
                    sourceUrl: item.sourceUrl ? item.sourceUrl : "",
                }
                command = {
                    command: "receive",
                    userId: roomId,
                    protocol: protocolId,
                    sendMessage: rep
                }
            }
            
            // broadcast
            redis.publish('socketBroadcast', JSON.stringify(command));
        }
    });
}

// generate url function
export const generateUrl = async (filename: any) => {
    // set up COS client object
    var cos = new COS({
        SecretId: process.env.SecretId,
        SecretKey: process.env.SecretKey,
    });
    // generate image url from tecent cloud with required params
    let url = await cos.getObjectUrl({
        Bucket: process.env.Bucket,
        Region: process.env.Region,
        Key: 'images' + '/' + filename,
        Expires: 1800,
        Sign: false,
    },
        function (err: any, data: any) {
            console.log(err || data);
        },
    );
    return url;
}
// compress image to jpg format
export const compressImg = async (filename: any, new_filename: any) => {
   
    // get current dir path
    let dir = process.cwd();
    // set up filepath
    var filepath = dir + '/' + process.env.DIR;
    try {
        // const {data, info} = await sharp(filepath+'/'+filename)
        //                     .raw()
        //                     .toBuffer({ resolveWithObject: true });
        // const pixelArray = new Uint8ClampedArray(data.buffer);

        // const {width, height, channels } = info;
        // console.log(filepath+'/'+filename)
        // use sharp library to compress image
        await sharp
            // (pixelArray, { raw: { width, height, channels}})
            (filepath + '/' + filename)
            // .toColourspace('rgb')
            // .pipelineColourspace('rgb16')
            .toColourspace('rgb16')
            .resize(768, null, {
                fit: sharp.fit.inside,
                withoutEnlargement: true
            })
            // .png({ quality: 60 })
            // .toFormat('jpg')
            .jpeg({
                quality: 60,
                // chromaSubsampling: '4:4:4',
                force: true, // <----- add this parameter
            })
            .toFile(filepath + '/' + new_filename);

        console.log("comporess finished")
    } catch (error) {
        console.log(error);
    }

}


// compress image to jpg format
export const compressImgYumi = async (filepath: any, filename: any, new_filename: any) => {
    let dir = process.cwd();
    // set up filepath
    // var filepath = dir +'/'+ process.env.DIR;
    try {
        await sharp
            (filepath + '/' + filename)
            .toColourspace('rgb16')
            .resize(768, null, {
                fit: sharp.fit.inside,
                withoutEnlargement: true
            })
            .jpeg({
                quality: 60,
                force: true, // <----- add this parameter
            })
            .toFile(filepath + '/' + new_filename);

        console.log("comporess finished")
    } catch (error) {
        console.log(error);
    }

}