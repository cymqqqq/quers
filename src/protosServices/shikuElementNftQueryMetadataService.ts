var cocreate_nft_json = require("../protos/shiku_nft_query_metadata.json")
var protobufjs = require("protobufjs").Root;
var cocreate_nft_Proto = protobufjs.fromJSON(cocreate_nft_json);
import {
    shikuElementNftGetMetadataController
} from "../controller/shikuNftLedger"

function shikuElementQueryMetadataNftService() {}

shikuElementQueryMetadataNftService.prototype.execute = async function (principal: any) {
    let metadata_rep = await shikuElementNftGetMetadataController(principal);
    return metadata_rep
}

module.exports = shikuElementQueryMetadataNftService