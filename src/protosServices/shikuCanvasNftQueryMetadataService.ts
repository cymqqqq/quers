var nft_json = require("../protos/shiku_nft_query_metadata.json")
var protobufjs = require("protobufjs").Root;
var nft_Proto = protobufjs.fromJSON(nft_json);
import {
    shikuCavansNftGetMetadataController
} from "../controller/shikuNftLedger"

function shikuCanvasQueryMetadataNftService() {}

shikuCanvasQueryMetadataNftService.prototype.execute = async function (principal: any) {
    let metadata_rep = await shikuCavansNftGetMetadataController(principal);
    return metadata_rep
}

module.exports = shikuCanvasQueryMetadataNftService