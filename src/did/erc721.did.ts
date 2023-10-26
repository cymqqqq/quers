   /* tslint:disable */
// @ts-ignore
   export const idlFactory = ({ IDL }) => {
    const TokenIdentifier = IDL.Text;
    const AccountIdentifier = IDL.Text;
    const User = IDL.Variant({
      'principal': IDL.Principal,
      'address': AccountIdentifier,
    });
    const AllowanceRequest = IDL.Record({
      'token': TokenIdentifier,
      'owner': User,
      'spender': IDL.Principal,
    });
    const Balance__1 = IDL.Nat;
    const CommonError = IDL.Variant({
      'InvalidToken': TokenIdentifier,
      'Other': IDL.Text,
    });
    const Result__1_2 = IDL.Variant({ 'ok': Balance__1, 'err': CommonError });
    const SubAccount = IDL.Vec(IDL.Nat8);
    const Balance = IDL.Nat;
    const ApproveRequest = IDL.Record({
      'token': TokenIdentifier,
      'subaccount': IDL.Opt(SubAccount),
      'allowance': Balance,
      'spender': IDL.Principal,
    });
    const TokenIndex = IDL.Nat32;
    const BalanceRequest = IDL.Record({
      'token': TokenIdentifier,
      'user': User,
    });
    const CommonError__1 = IDL.Variant({
      'InvalidToken': TokenIdentifier,
      'Other': IDL.Text,
    });
    const BalanceResponse = IDL.Variant({
      'ok': Balance,
      'err': CommonError__1,
    });
    const MintRequest = IDL.Record({
      'to': User,
      'metadata': IDL.Opt(IDL.Vec(IDL.Nat8)),
    });
    const Memo = IDL.Vec(IDL.Nat8);
    const TransferRequest = IDL.Record({
      'to': User,
      'token': TokenIdentifier,
      'notify': IDL.Bool,
      'from': User,
      'memo': Memo,
      'subaccount': IDL.Opt(SubAccount),
      'amount': Balance,
    });
    const TransferResponse = IDL.Variant({
      'ok': Balance,
      'err': IDL.Variant({
        'CannotNotify': AccountIdentifier,
        'InsufficientBalance': IDL.Null,
        'InvalidToken': TokenIdentifier,
        'Rejected': IDL.Null,
        'Unauthorized': AccountIdentifier,
        'Other': IDL.Text,
      }),
    });
    const TokenIdentifier__1 = IDL.Text;
    const AccountIdentifier__1 = IDL.Text;
    const Result__1_1 = IDL.Variant({
      'ok': AccountIdentifier__1,
      'err': CommonError,
    });
    const Extension = IDL.Text;
    const Metadata = IDL.Variant({
      'fungible': IDL.Record({
        'decimals': IDL.Nat8,
        'metadata': IDL.Opt(IDL.Vec(IDL.Nat8)),
        'name': IDL.Text,
        'symbol': IDL.Text,
      }),
      'nonfungible': IDL.Record({ 'metadata': IDL.Opt(IDL.Vec(IDL.Nat8)) }),
    });
    const HeaderField = IDL.Tuple(IDL.Text, IDL.Text);
    const HttpRequest = IDL.Record({
      'url': IDL.Text,
      'method': IDL.Text,
      'body': IDL.Vec(IDL.Nat8),
      'headers': IDL.Vec(HeaderField),
    });
    const HttpResponse = IDL.Record({
      'body': IDL.Vec(IDL.Nat8),
      'headers': IDL.Vec(HeaderField),
      'status_code': IDL.Nat16,
    });
    const Property = IDL.Record({ 'trait_type': IDL.Text, 'value': IDL.Text });
    const Result__1 = IDL.Variant({ 'ok': Metadata, 'err': CommonError });
    const Result_2 = IDL.Variant({ 'ok': Balance__1, 'err': CommonError });
    const Result_1 = IDL.Variant({
      'ok': IDL.Vec(TokenIndex),
      'err': CommonError,
    });
    const Time = IDL.Int;
    const Listing = IDL.Record({
      'locked': IDL.Opt(Time),
      'seller': IDL.Principal,
      'price': IDL.Nat64,
    });
    const Result = IDL.Variant({
      'ok': IDL.Vec(
        IDL.Tuple(TokenIndex, IDL.Opt(Listing), IDL.Opt(IDL.Vec(IDL.Nat8)))
      ),
      'err': CommonError,
    });
    const ERC721 = IDL.Service({
      'acceptCycles': IDL.Func([], [], []),
      'allowance': IDL.Func([AllowanceRequest], [Result__1_2], ['query']),
      'approve': IDL.Func([ApproveRequest], [IDL.Bool], []),
      'approveAll': IDL.Func(
        [IDL.Vec(ApproveRequest)],
        [IDL.Vec(TokenIndex)],
        [],
      ),
      'availableCycles': IDL.Func([], [IDL.Nat], ['query']),
      'balance': IDL.Func([BalanceRequest], [BalanceResponse], ['query']),
      'batchMintNFT': IDL.Func(
        [IDL.Vec(MintRequest)],
        [IDL.Vec(TokenIndex)],
        [],
      ),
      'batchTransfer': IDL.Func(
        [IDL.Vec(TransferRequest)],
        [IDL.Vec(TransferResponse)],
        [],
      ),
      'bearer': IDL.Func([TokenIdentifier__1], [Result__1_1], ['query']),
      'clearProperties': IDL.Func([], [], ['oneway']),
      'extensions': IDL.Func([], [IDL.Vec(Extension)], ['query']),
      'getAllowances': IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(TokenIndex, IDL.Principal))],
        ['query'],
      ),
      'getMinter': IDL.Func([], [IDL.Principal], ['query']),
      'getProperties': IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Vec(IDL.Tuple(IDL.Text, IDL.Nat))))],
        ['query'],
      ),
      'getRegistry': IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(TokenIndex, AccountIdentifier__1))],
        ['query'],
      ),
      'getRootBucketId': IDL.Func([], [IDL.Opt(IDL.Text)], []),
      'getScore': IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(TokenIndex, IDL.Float64))],
        ['query'],
      ),
      'getTokens': IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(TokenIndex, Metadata))],
        ['query'],
      ),
      'getTokensByIds': IDL.Func(
        [IDL.Vec(TokenIndex)],
        [IDL.Vec(IDL.Tuple(TokenIndex, Metadata))],
        ['query'],
      ),
      'getTokensByProperties': IDL.Func(
        [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Vec(IDL.Text)))],
        [IDL.Vec(IDL.Tuple(TokenIndex, Metadata))],
        ['query'],
      ),
      'http_request': IDL.Func([HttpRequest], [HttpResponse], ['query']),
      'initCap': IDL.Func([], [IDL.Opt(IDL.Text)], []),
      'initproperties': IDL.Func([TokenIndex, TokenIndex], [], []),
      'lookProperties': IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(Property, IDL.Vec(TokenIndex)))],
        ['query'],
      ),
      'metadata': IDL.Func([TokenIdentifier__1], [Result__1], ['query']),
      'mintNFT': IDL.Func([MintRequest], [TokenIndex], []),
      'setMinter': IDL.Func([IDL.Principal], [], []),
      'setScoreOfTokenId': IDL.Func([], [], []),
      'supply': IDL.Func([TokenIdentifier__1], [Result_2], ['query']),
      'tokens': IDL.Func([AccountIdentifier__1], [Result_1], ['query']),
      'tokens_ext': IDL.Func([AccountIdentifier__1], [Result], ['query']),
      'transfer': IDL.Func([TransferRequest], [TransferResponse], []),
      'updateNFTName': IDL.Func(
        [IDL.Text, IDL.Text, TokenIndex, TokenIndex],
        [],
        [],
      ),
    });
    return ERC721;
  };
// @ts-ignore
export  const init = ({ IDL }) => {
    return [IDL.Principal];
  };