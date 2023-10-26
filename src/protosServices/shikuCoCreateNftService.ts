var cocreate_nft_json = require("../protos/shiku_cocreate_nft.json")
var protobufjs = require("protobufjs").Root;
var cocreate_nft_Proto = protobufjs.fromJSON(cocreate_nft_json);
import {
    shikuCoCreateNftMintController
} from "../controller/shikuNftLedger"

function shikuCoCreateMintNftService() {}

shikuCoCreateMintNftService.prototype.decodeAndExecute = async function (buffer: any) {
    let request_type: any
    request_type = cocreate_nft_Proto.lookupType("GetMintReq")
    let decoded_buffer: any
    decoded_buffer = request_type.decode(buffer)
    let mint_rep = await shikuCoCreateNftMintController(decoded_buffer.canister, decoded_buffer.to, decoded_buffer.prop);
    return mint_rep
}
