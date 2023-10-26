var nft_json = require("../protos/shiku_nft_query_metadata.json")
var protobufjs = require("protobufjs").Root;
var nft_Proto = protobufjs.fromJSON(nft_json);
import {
    shikuCoCreateNftGetMetadataController
} from "../controller/shikuNftLedger"

function shikuCoCreateQueryMetadataNftService() {}

shikuCoCreateQueryMetadataNftService.prototype.execute = async function (principal: any) {
    let metadata_rep = await shikuCoCreateNftGetMetadataController(principal);
    return metadata_rep
}

module.exports = shikuCoCreateQueryMetadataNftService