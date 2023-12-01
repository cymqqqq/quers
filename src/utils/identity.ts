// identity.js
import { Ed25519KeyIdentity } from "@dfinity/identity";
import { Secp256k1KeyIdentity } from "@dfinity/identity-secp256k1";
import hdkey from "hdkey";
import { mnemonicToSeed, generateMnemonic } from "bip39";

// Completely insecure seed phrase. Do not use for any purpose other than testing.
// Resolves to "rwbxt-jvr66-qvpbz-2kbh3-u226q-w6djk-b45cp-66ewo-tpvng-thbkh-wae"
// const seed = "endless text buffalo stone sadness chest leopard blood goat aunt regular address";
const seed = "reduce health announce scheme bulk jaguar flight clinic truly budget cave novel";

let testAccount = "2cksr-47fst-c4ih7-tsstk-dvagp-rzbei-rrqh2-dpzd6-pcflw-7ptvi-nqe";
let account1 = "6gutn-gdmoc-57yy3-w5wyh-7tpij-uummv-4rxwy-652kl-ojd7o-tmptt-lqe"

export const getMemonic = async () => {
    let res = await generateMnemonic();
    return res
}

export const getIdentityFromSeed = async (phase: string) => {
    
    // console.log("创建秘钥", TEST_MNEMONIC);
    const seed = await mnemonicToSeed(phase);
    const root = hdkey.fromMasterSeed(seed);
    const addrnode = root.derive("m/44'/223'/0'/0/0");
    return Secp256k1KeyIdentity.fromSecretKey(addrnode.privateKey);
};

const ED25519_KEY_INIT = '3053020101300506032b657004220420';
const ED25519_KEY_SEPARATOR = 'a123032100';
const ED25519_OID = '06032b6570';

const SEC256k1_KEY_INIT = '30740201010420';
const SEC256k1_KEY_SEPARATOR = 'a00706052b8104000aa144034200';
const SEC256k1_OID = '06052b8104000a'

interface ICP {
    principal: string;
}

export const parseEd25519 = (pem: string) => {

    const raw = Buffer.from(pem, 'base64')
        .toString('hex')

    if (!raw.substring(0, 24).includes(ED25519_OID)) {
        return undefined;
    }

    const trimRaw = raw
        .replace(ED25519_KEY_INIT, '')
        .replace(ED25519_KEY_SEPARATOR, '');

    try {
        const key = new Uint8Array(Buffer.from(trimRaw, 'hex'));
        const identity = Ed25519KeyIdentity.fromSecretKey(key);
        // const type = Types.pem25519;
        return identity;
    } catch {
        return undefined
    }
}

export const parseSec256K1 = (pem: string) => {

    const raw = Buffer.from(pem, 'base64')
        .toString('hex')

    if (!raw.includes(SEC256k1_OID)) {
        return undefined;
    }

    const trimRaw = raw
        .replace(SEC256k1_KEY_INIT, '')
        .replace(SEC256k1_KEY_SEPARATOR, '')

    try {
        const key = new Uint8Array(Buffer.from(trimRaw.substring(0, 64), 'hex'));
        const identity = Secp256k1KeyIdentity.fromSecretKey(key);
        // const type = Types.pem256k1;
        return identity;
    } catch {
        return undefined;
    }
}

export const getIdentityFromPem = (pem: string) => {

    const trimedPem = pem
        .replace(/(-{5}.*-{5})/g, '')
        .replace('\n', '')
        // Sepk256k1 keys
        .replace('BgUrgQQACg==', '')
        .trim();

    console.log("啥玩意？", trimedPem)

    const parsedIdentity = parseEd25519(trimedPem) || parseSec256K1(trimedPem);

    if (!parsedIdentity) throw new Error("INVALID_KEY");

    console.log("解析出来了吗？", parsedIdentity.getPrincipal().toString());
    return parsedIdentity;

}

export const identity = getIdentityFromSeed(seed);
