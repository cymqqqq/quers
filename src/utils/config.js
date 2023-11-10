import userJson from "../../user.json"
// canisters
export const boe = {
    yumi: 'ajy76-hiaaa-aaaah-aa3mq-cai', // 主容器
    ledger: 'irzpe-yqaaa-aaaah-abhfa-cai', // 账单
    record: 'zf7n3-2aaaa-aaaah-aanea-cai', // activity
    newRecord: 'sgynd-aaaaa-aaaah-abcnq-cai', // activity new
    launchpad: 'o2qzt-caaaa-aaaah-abhsa-cai', // launchpad
    point: 'l2pzh-6iaaa-aaaah-abhpq-cai', // credit
    oat: 'xlsz5-7aaaa-aaaah-abfma-cai', // oat
    blockIndex: 'iy2ey-oyaaa-aaaah-abheq-cai', // 测试环境查块高交易记录
    origyn: 'patk5-byaaa-aaaap-aamda-cai',
    ogyLaunchpad: 'zkpdr-hqaaa-aaaak-ac4lq-cai',
    ogyMarket: 'lcaww-uyaaa-aaaag-aaylq-cai',
    shikuTestToken: 'ozcip-uyaaa-aaaah-adkfa-cai',
    shikuTestTokenBlock: 'bney7-riaaa-aaaah-adlaa-cai',
    shikuCanvasNft: 'asmli-sqaaa-aaaah-adleq-cai',
    shikuCoCreateNft: 'c2wun-aqaaa-aaaah-adliq-cai',
    yumi_test1: 'bqeck-7aaaa-aaaah-abv4q-cai',
    yumi_test2: 'wt6ea-7aaaa-aaaah-adpca-cai',
};

export const ppe = {
    yumi: 'pfsjt-fqaaa-aaaap-aaapq-cai',
    ledger: 'ryjl3-tyaaa-aaaaa-aaaba-cai',
    record: 'kuzps-tqaaa-aaaag-qaggq-cai',
    newRecord: 'd4uvm-2iaaa-aaaap-aakrq-cai',
    launchpad: '4aatc-iyaaa-aaaao-aabsa-cai',
    point: 'k52eo-fyaaa-aaaag-qagha-cai',
    oat: 'xbgld-rqaaa-aaaah-abcqq-cai',
    blockIndex: 'yuxhl-fiaaa-aaaah-abieq-cai',
    origyn: '',
    ogyLaunchpad: '',
    ogyMarket: '',
    factory: 'zs7f5-3yaaa-aaaah-adoeq-cai',
    icrc7: '6222m-vqaaa-aaaah-adova-cai',
    avatar: 'oifsw-gqaaa-aaaah-ads6q-cai',
};

export const online = {
    yumi: 'udtw4-baaaa-aaaah-abc3q-cai',
    ledger: '',
    record: '',
    oldRecord: 'uesqi-myaaa-aaaah-abc3a-cai',
    newRecord: '56www-tyaaa-aaaap-aai4q-cai',
    launchpad: 'pczmq-maaaa-aaaah-abhwa-cai',
    point: '',
    oat: 'v43fl-cyaaa-aaaah-abc7a-cai',
    blockIndex: 'yuxhl-fiaaa-aaaah-abieq-cai',
    origyn: '',
    ogyLaunchpad: '2htsr-ziaaa-aaaaj-azrkq-cai',
    ogyMarket: '',
    artist: 'qnblj-lyaaa-aaaah-aa74a-cai',
    oracle: 'uf6dk-hyaaa-aaaaq-qaaaq-cai',
    aution: 'ajy76-hiaaa-aaaah-aa3mq-cai',
    shiku_nft: 'ezo5a-taaaa-aaaah-abkfa-cai',
    shiku_lands_test: 'vpkok-7aaaa-aaaah-abjna-cai',
    shiku_lands_prod: '3j32q-6iaaa-aaaap-aaijq-cai',
};


export const mnemonicWord = {
    simonAccount: userJson.simonAccount,
    jayzAccount: userJson.jayzAccount,
    yumengAccount: userJson.yumengAccount,
    shikuAccount: userJson.shikuAccount,
    shiku_nft_account: userJson.shiku_nft_account,
};



export const HOST = "https://boundary.ic0.app";
export const IC_SCAN =  "https://icscan.io/canister/"
let yumiCid,
    ledgerCid,
    recordCid,
    newRecordCid,
    launchpadCid,
    pointCid,
    oatCid,
    blockIndexCid,
    origynCid,
    ogyLaunchpadCid,
    ogyMarketCid;
// 测试环境
if (process.env.RUN_ENV === 'boe') {
    yumiCid = boe.yumi;
    ledgerCid = boe.ledger;
    recordCid = boe.record;
    newRecordCid = boe.newRecord;
    launchpadCid = boe.launchpad;
    pointCid = boe.point;
    oatCid = boe.oat;
    blockIndexCid = boe.blockIndex;
    origynCid = boe.origyn;
    ogyLaunchpadCid = boe.ogyLaunchpad;
    ogyMarketCid = boe.ogyMarket;
}
// 预览环境
if (process.env.RUN_ENV === 'ppe') {
    yumiCid = ppe.yumi;
    ledgerCid = ppe.ledger;
    recordCid = ppe.record;
    newRecordCid = ppe.newRecord;
    launchpadCid = ppe.launchpad;
    pointCid = ppe.point;
    oatCid = ppe.oat;
    blockIndexCid = ppe.blockIndex;
    origynCid = ppe.origyn;
    ogyLaunchpadCid = ppe.ogyLaunchpad;
    ogyMarketCid = ppe.ogyMarket;
}
// 正式环境
if (process.env.RUN_ENV === 'online') {
    yumiCid = online.yumi;
    ledgerCid = online.ledger;
    recordCid = online.record;
    newRecordCid = online.newRecord;
    launchpadCid = online.launchpad;
    pointCid = online.point;
    oatCid = online.oat;
    blockIndexCid = online.blockIndex;
    origynCid = online.origyn;
    ogyLaunchpadCid = online.ogyLaunchpad;
    ogyMarketCid = online.ogyMarket;
    artistCid = online.artist;
}






