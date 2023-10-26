import { 
    generateUrl,
    downloadImage,
    compressImg,
    getImage
 } from "../utils/cloud_api";
 import { 
   metadata,
   getNFTMetadata
 } from "./shikuController";
 const COS =  require('cos-nodejs-sdk-v5');
 const fs = require('fs');
 export const downloadImageController = async (req: any, res: any, next: any) => {
   try {
      
   let metadata_res: any;
   let url_split= req.body.url.split("/");
   let canister = url_split[url_split.length - 2];
   let num = url_split[url_split.length - 1];
   metadata_res = await metadata(canister, num);

   let byte_metadata = metadata_res.ok.nonfungible.metadata; 
   let nft_metadata = await getNFTMetadata(byte_metadata);
   let metadata_json = nft_metadata[0] ? nft_metadata[0] : 'No metadata';
   let thumbnail = metadata_json.thumbnail ? metadata_json.thumbnail : metadata_json.url;

   getImage(thumbnail);
    res.status(201).json({
      message: "download finished"
    })
   } catch (e) {
      console.log(e)
   }

 }

 // upload file function
export const uploadFile = (filename: any) => {
  // console.log(item);
  // set up COS client
  var cos = new COS({
      SecretId: process.env.SecretId,
      SecretKey: process.env.SecretKey,
  });
  // get current dir path
  let dir = process.cwd();
  var filepath = dir +'/'+ process.env.DIR;
  // let md5 = require("md5");
  // let new_filename = 'new_'+md5(imageUrl)+'.jpg';
  // console.log(filename)
  // upload image file to tecent cloud
  console.log(filepath+'/'+filename);
  cos.putObject({
      Bucket : process.env.Bucket,                        /* 必须 */
      Region : process.env.Region,                        /* 必须 */
      Key : 'images'+'/'+filename,                           /* 必须 */
      Body: fs.createReadStream(filepath+'/'+filename),           /* 必须 */
      onProgress: function (progressData: any) {
          console.log(progressData);
      },
  }, async function(err: any, data: any) {
      if(err) {
          console.log(err);
      } else {
          console.log("upload finished");
      }
    }
  )
}

export const upload_file_controller = async (req: any, res: any, next: any) => {
  uploadFile(req.body.filename);
  res.status(201).json({
    result: "upload finished"
  })
}

export const generate_url_controller = async (req: any, res: any, next: any) => {
  let url = await generateUrl(req.body.filename);
  res.status(201).json({
    result: url
  })
}