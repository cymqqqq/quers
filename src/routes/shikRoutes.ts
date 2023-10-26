import express from "express";
import * as shikuDataController from "../controller/dataServiceController";
import * as shikuCoCreateController from "../controller/shikuCoCreateController";
import * as shikuController from "../controller/shikuController";
const router = express.Router();
/**
 * @swagger
 * definitions:
 *   linkReq:
 *     properties:
 *       link:
 *         type: string
 *       index:
 *         type: any
 *       roomId:
 *         type: any
 *       protocol:
 *         type: any
*/ 

/**
 * @swagger
 * definitions:
 *   shikuNftdataReq:
 *     properties:
 *       pid:
 *         type: string
*/ 

/**
 * @swagger
 * definitions:
 *   shikuLanddataReq:
 *     properties:
 *       land_id:
 *         type: number
*/ 
/**
 * @swagger
 * definitions:
 *   shikuNftRefundReq:
 *     properties:
 *       from_principal:
 *         type: string
 *       to_principal:
 *         type: string
 *       tokenid:
 *         type: number
 *       canister_id:
 *         type: string
*/ 

/**
 * @swagger
 * definitions:
 *   shikuNftWithdrawReq:
 *     properties:
 *       from_principal:
 *         type: string
 *       to_principal:
 *         type: string
 *       tokenid:
 *         type: number
 *       canister_id:
 *         type: string
*/ 


/**
 * @swagger
 * definitions:
 *   shikuNftMetaDataReq:
 *     properties:
 *       canister:
 *         type: string
 *       principal:
 *         type: string
 * 
*/ 

/**
 * @swagger
 * definitions:
 *   shikuNftMintReq:
 *     properties:
 *       to_principal:
 *         type: string
 *       canister_id:
 *         type: string
 *       logo:
 *         type: string
 *       name:
 *         type: string
 *       description:
 *         type: string
 * 
*/ 
/**
 * @swagger
 * definitions:
 *   shikuNftOwnerTokenIdReq:
 *     properties:
 *       to_principal:
 *         type: string
 *       canister_id:
 *         type: string
*/ 

/**
 * @swagger
 * definitions:
 *   getUserRecordReq:
 *     properties:
 *       pid:
 *         type: string
*/ 

/**
 * @swagger
 * definitions:
 *   shikuWalletQueryNftMetadataReq:
 *     properties:
 *       pid:
 *         type: string
 *       canister_id:
 *         type: string
*/ 


/**
 * @swagger
 * definitions:
 *   getUserNftReq:
 *     properties:
 *       canister_id:
 *         type: string
 *       pid:
 *         type: string
 * 
*/ 


/**
 * @swagger
 * /transfer:
 *  post:
 *    tags:
 *      - transfer
 *    summary: transfer NFT from A user to B user.
 *    description: transfer NFT from A user to B user.
 *    responses:
 *      200:
 *        description: return ok
 */
router.post("/transfer", shikuController.transfer_controller);

/**
 * @swagger
 * /shiku/getNftData:
 *  post:
 *    tags:
 *      - shiku
 *    summary: obtain parsed json metadata of an NFT.
 *    description: obtain parsed json metadata of an NFT.
 *    requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/linkReq'
 *    responses:
 *      200:
 *        description: return nft json data
 */
router.post("/getNftData", shikuController.nft_info_controller);

/**
 * @swagger
 * /shiku/getUserEvents:
 *  post:
 *    tags:
 *      - shiku
 *    summary: obtain parsed json metadata of the user record activity.
 *    description: obtain parsed json metadata of the user record activity.
 *    requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/getUserRecordReq'
 *    responses:
 *      200:
 *        description: return nft json data
 */
router.post("/getUserEvents", shikuController.record_info_controller);
// https://tppkg-ziaaa-aaaal-qatrq-cai.raw.ic0.app/market/nft-detail/goncb-kqaaa-aaaap-aakpa-cai/1994
/**
 * @swagger
 * /shiku/getUserYumiNft:
 *  post:
 *    tags:
 *      - shiku
 *    summary: obtain parsed json metadata of the user record activity.
 *    description: obtain parsed json metadata of the user record activity.
 *    requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/getUserNftReq'
 *    responses:
 *      200:
 *        description: return nft json data
 */
router.post("/getUserYumiNft", shikuController.list_collections_controller);

/**
 * @swagger
 * /shiku/shikuUserRefundNft:
 *  post:
 *    tags:
 *      - shiku
 *    summary: user refund nft to shiku account.
 *    description: user refund nft to shiku account.
 *    requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/shikuNftRefundReq'
 *    responses:
 *      200:
 *        description: return nft json data
 */
router.post("/shikuUserRefundNft", shikuController.shiku_nft_transfer_controller);

/**
 * @swagger
 * /shiku/shikuUserWithdrawNft:
 *  post:
 *    tags:
 *      - shiku
 *    summary: shiku account transfer nft to the specific user.
 *    description: shiku account transfer nft to the specific user.
 *    requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/shikuNftWithdrawReq'
 *    responses:
 *      200:
 *        description: return nft json data
 */
router.post("/shikuUserWithdrawNft", shikuController.shiku_nft_transfer_controller);

/**
 * @swagger
 * /shiku/shikuLandPropData:
 *  post:
 *    tags:
 *      - shiku
 *    summary: backup shiku land prop data.
 *    description: backup shiku land prop data.
 *    requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/shikuLanddataReq'
 *    responses:
 *      200:
 *        description: return nft json data
 */
router.post("/shikuLandPropData", shikuController.shiku_land_prop_controller);

/**
 * @swagger
 * /shiku/shikuNftDataDelete:
 *  post:
 *    tags:
 *      - shiku
 *    summary: backup shiku land prop data.
 *    description: backup shiku land prop data.
 *    requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/shikuNftdataReq'
 *    responses:
 *      200:
 *        description: return nft json data
 */
router.post("/shikuNftDataDelete", shikuDataController.shiku_wallet_user_nft_data_delete_service_controller);

/**
 * @swagger
 * /shiku/shikuMintNft:
 *  post:
 *    tags:
 *      - shiku
 *    summary: shiku mint nft.
 *    description: shiku mint nft.
 *    requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/shikuNftMintReq'
 *    responses:
 *      200:
 *        description: return nft json data
 */
router.post("/shikuMintNft", shikuController.shiku_nft_mint_controller);


/**
 * @swagger
 * /shiku/shikuNftGetMetaData:
 *  post:
 *    tags:
 *      - shiku
 *    summary: shiku get nft metadata.
 *    description: shiku get nft metadata.
 *    requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/shikuNftMetaDataReq'
 *    responses:
 *      200:
 *        description: return nft json data
 */
router.post("/shikuNftGetMetaData", shikuController.getShikuNftMetaDataController);


// router.post("/shikuMintNft", shikuController.shiku_nft_mint_controller);

/**
 * @swagger
 * /shiku/shikuNftOwnerTokenId:
 *  post:
 *    tags:
 *      - shiku
 *    summary: shiku mint nft.
 *    description: shiku mint nft.
 *    requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/shikuNftOwnerTokenIdReq'
 *    responses:
 *      200:
 *        description: return nft json data
 */
router.post("/shikuNftOwnerTokenId", shikuController.shiku_nft_owner_tokenid_controller);




/**
 * @swagger
 * /shiku/shikuNftDataDeleteAll:
 *  post:
 *    tags:
 *      - shiku
 *    summary: backup shiku land prop data.
 *    description: backup shiku land prop data.
 *    responses:
 *      200:
 *        description: return nft json data
 */
router.post("/shikuNftDataDeleteAll", shikuDataController.shiku_wallet_user_nft_data_delete_all_service_controller);

/**
 * @swagger
 * /shiku/shikuNftDataDeleteAllTest:
 *  post:
 *    tags:
 *      - shiku
 *    summary: backup shiku land prop data.
 *    description: backup shiku land prop data.
 *    responses:
 *      200:
 *        description: return nft json data
 */
router.post("/shikuNftDataDeleteAllTest", shikuDataController.shiku_wallet_user_nft_data_delete_all_service_controller_test);


/**
 * @swagger
 * definitions:
 *   shikuNftUpdateStatusReq:
 *     properties:
 *       canister:
 *         type: string
 *       token_id:
 *         type: string
 * 
*/ 


/**
 * @swagger
 * /shiku/shikuNftUpdateStatus:
 *  post:
 *    tags:
 *      - shiku
 *    summary: shiku mint nft.
 *    description: shiku mint nft.
 *    requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/shikuNftUpdateStatusReq'
 *    responses:
 *      200:
 *        description: return nft json data
 */
router.post("/shikuNftUpdateStatus", shikuCoCreateController.shiku_update_cocreate_token_status);



export default router;

