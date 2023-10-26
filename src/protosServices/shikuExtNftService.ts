var nft_json = require("../protos/shiku_nft_query_metadata.json")
var protobufjs = require("protobufjs").Root;
var nft_Proto = protobufjs.fromJSON(nft_json);
import {
    shikuExtNftGetMetadataController
} from "../controller/shikuNftLedger"

function shikuExtQueryMetadataNftService() {}

shikuExtQueryMetadataNftService.prototype.execute = async function (principal: any) {
    let metadata_rep = await shikuExtNftGetMetadataController(principal);
    return metadata_rep
}

module.exports = shikuExtQueryMetadataNftService