import userJson from "../../user.json"
// canisters
// cookie setting options

export const boe = {
    yumi: 'ajy76-hiaaa-aaaah-aa3mq-cai', // 主容器
    ledger: 'irzpe-yqaaa-aaaah-abhfa-cai', // 账单
};

export const ppe = {
    ledger: 'ryjl3-tyaaa-aaaaa-aaaba-cai',
};



export const mnemonicWord = {
    yumengAccount: userJson.yumengAccount,
};



export const HOST = "https://boundary.ic0.app";
export const IC_SCAN =  "https://icscan.io/canister/"
let ledgerCid
// 测试环境
if (process.env.RUN_ENV === 'boe') {
    ledgerCid = boe.ledger;
}
// 预览环境
if (process.env.RUN_ENV === 'ppe') {
    ledgerCid = ppe.ledger;
}
// 正式环境
if (process.env.RUN_ENV === 'online') {
    ledgerCid = online.ledger;
}






