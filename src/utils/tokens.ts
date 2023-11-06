import { TOKEN } from './standards';


export interface StandardToken {
  name: string;
  symbol: string;
  canisterId: string;
  standard: string;
  decimals: number;
  color?: string;
  logo?: string;
  fee?: bigint | number;
}

export interface TokenBalance {
  amount: string;
  token: StandardToken;
  error?: string;
}


export const TOKENS = {
  ICP: {
    symbol: 'ICP',
    canisterId: 'ryjl3-tyaaa-aaaaa-aaaba-cai',
    name: 'ICP',
    decimals: 8,
    standard: TOKEN.rosetta,
  },
  XTC: {
    symbol: 'XTC',
    canisterId: 'aanaa-xaaaa-aaaah-aaeiq-cai',
    name: 'Cycles',
    decimals: 12,
    standard: TOKEN.xtc,
  },
  WTC: {
    symbol: 'WTC',
    canisterId: '5ymop-yyaaa-aaaah-qaa4q-cai',
    name: 'Wrapped Cycles',
    decimals: 12,
    standard: TOKEN.dip20,
  },
  WICP: {
    symbol: 'WICP',
    canisterId: 'utozz-siaaa-aaaam-qaaxq-cai',
    name: 'Wrapped ICP',
    decimals: 8,
    standard: TOKEN.wicp,
  },
  BTKN: {
    symbol: 'BTKN',
    canisterId: 'cfoim-fqaaa-aaaai-qbcmq-cai',
    name: 'Beta Token',
    decimals: 8,
    standard: TOKEN.dip20,
  },
  DUST: {
    symbol: 'DUST',
    canisterId: '4mvfv-piaaa-aaaak-aacia-cai',
    name: 'Dust Token',
    decimals: 8,
    standard: TOKEN.dip20,
  },
};

export const DEFAULT_MAINNET_TOKENS = [TOKENS.ICP, TOKENS.XTC, TOKENS.WICP];

export const DEFAULT_MAINNET_ASSETS = DEFAULT_MAINNET_TOKENS.reduce(
  (acum, token) => ({ ...acum, [token.canisterId]: { token, amount: '0' } }),
  {}
);
