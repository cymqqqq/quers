
/* tslint:disable */
// @ts-ignore
export const idlFactory = ({ IDL }) => {
  const DetailValue = IDL.Rec();
  const InitArgs = IDL.Record({
    'cap' : IDL.Opt(IDL.Principal),
    'logo' : IDL.Opt(IDL.Text),
    'name' : IDL.Opt(IDL.Text),
    'custodians' : IDL.Opt(IDL.Vec(IDL.Principal)),
    'symbol' : IDL.Opt(IDL.Text),
  });
  const ApproveRequest = IDL.Record({
    'token' : IDL.Text,
    'subaccount' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'allowance' : IDL.Nat,
    'spender' : IDL.Principal,
  });
  const User = IDL.Variant({
    'principal' : IDL.Principal,
    'address' : IDL.Text,
  });
  const MintRequest = IDL.Record({
    'to' : User,
    'metadata' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'class' : IDL.Text,
  });
  const TransferRequestV1 = IDL.Record({
    'to' : User,
    'num' : IDL.Nat64,
    'notify' : IDL.Bool,
    'from' : User,
    'class' : IDL.Text,
    'memo' : IDL.Vec(IDL.Nat8),
    'subaccount' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'amount' : IDL.Nat,
  });
  const TransferRequestV2 = IDL.Record({
    'to' : User,
    'notify' : IDL.Bool,
    'from' : User,
    'memo' : IDL.Vec(IDL.Nat8),
    'subaccount' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'amount' : IDL.Nat,
    'token_list' : IDL.Vec(IDL.Nat),
  });
  const NftError = IDL.Variant({
    'UnauthorizedOperator' : IDL.Null,
    'TokenNotFound' : IDL.Null,
    'UnauthorizedOwner' : IDL.Null,
    'SelfApprove' : IDL.Null,
    'OperatorNotFound' : IDL.Null,
    'ExistedNFT' : IDL.Null,
    'OwnerNotFound' : IDL.Null,
  });
  const Result = IDL.Variant({ 'Ok' : IDL.Nat, 'Err' : NftError });
  const MetaDataFungibleDetails = IDL.Record({
    'decimals' : IDL.Nat8,
    'metadata' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'name' : IDL.Text,
    'symbol' : IDL.Text,
  });
  const MetaDataNonFungibleDetails = IDL.Record({
    'metadata' : IDL.Opt(IDL.Vec(IDL.Nat8)),
  });
  const TokenMetaDataExt = IDL.Variant({
    'fungible' : MetaDataFungibleDetails,
    'nonfungible' : MetaDataNonFungibleDetails,
  });
  const PropMetadata = IDL.Record({
    'image_uri' : IDL.Text,
    'desc' : IDL.Text,
    'class' : IDL.Text,
  });
  DetailValue.fill(
    IDL.Variant({
      'I64' : IDL.Int64,
      'U64' : IDL.Nat64,
      'Vec' : IDL.Vec(DetailValue),
      'Slice' : IDL.Vec(IDL.Nat8),
      'TokenIdU64' : IDL.Nat64,
      'Text' : IDL.Text,
      'True' : IDL.Null,
      'False' : IDL.Null,
      'Float' : IDL.Float64,
      'Principal' : IDL.Principal,
    })
  );
  const IndefiniteEvent = IDL.Record({
    'operation' : IDL.Text,
    'details' : IDL.Vec(IDL.Tuple(IDL.Text, DetailValue)),
    'caller' : IDL.Principal,
  });
  const CommonError = IDL.Variant({
    'InvalidToken' : IDL.Text,
    'Other' : IDL.Text,
  });
  const Result_2 = IDL.Variant({ 'ok' : IDL.Nat, 'err' : CommonError });
  const Listing = IDL.Record({
    'locked' : IDL.Opt(IDL.Int),
    'seller' : IDL.Principal,
    'price' : IDL.Nat64,
  });
  const NFTResult = IDL.Variant({
    'ok' : IDL.Vec(
      IDL.Tuple(
        IDL.Nat32,
        IDL.Opt(Listing),
        IDL.Opt(IDL.Vec(IDL.Vec(IDL.Nat8))),
      )
    ),
    'err' : CommonError,
  });
  const TransferRequest = IDL.Record({
    'to' : User,
    'token' : IDL.Text,
    'notify' : IDL.Bool,
    'from' : User,
    'memo' : IDL.Vec(IDL.Nat8),
    'subaccount' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'amount' : IDL.Nat,
  });
  const TransferResponseDetails = IDL.Variant({
    'CannotNotify' : IDL.Text,
    'InsufficientBalance' : IDL.Null,
    'InvalidToken' : IDL.Text,
    'Rejected' : IDL.Null,
    'Unauthorized' : IDL.Text,
    'Other' : IDL.Text,
  });
  const TransferResponse = IDL.Variant({
    'ok' : IDL.Nat,
    'err' : TransferResponseDetails,
  });
  return IDL.Service({
    'add' : IDL.Func([IDL.Text], [IDL.Bool], []),
    'approve' : IDL.Func([ApproveRequest], [IDL.Bool], []),
    'batch_mint' : IDL.Func(
        [MintRequest, IDL.Opt(IDL.Nat32)],
        [IDL.Vec(IDL.Nat32)],
        [],
      ),
    'batch_transfer_v1' : IDL.Func([TransferRequestV1], [IDL.Vec(IDL.Nat)], []),
    'batch_transfer_v2' : IDL.Func([TransferRequestV2], [IDL.Vec(IDL.Nat)], []),
    'burn' : IDL.Func([IDL.Nat], [Result], []),
    'getTokens' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Nat32, TokenMetaDataExt))],
        ['query'],
      ),
    'init_prop' : IDL.Func([], [IDL.Vec(PropMetadata)], []),
    'metadata' : IDL.Func([IDL.Text], [IDL.Opt(TokenMetaDataExt)], ['query']),
    'mintNFT' : IDL.Func([MintRequest], [IDL.Nat32], []),
    'operator_of' : IDL.Func([IDL.Nat], [IDL.Opt(IDL.Principal)], ['query']),
    'owner_of' : IDL.Func([IDL.Nat], [IDL.Opt(IDL.Principal)], ['query']),
    'pending_transactions' : IDL.Func(
        [],
        [IDL.Vec(IndefiniteEvent)],
        ['query'],
      ),
    'prop_info' : IDL.Func([], [IDL.Vec(PropMetadata)], []),
    'supply' : IDL.Func([], [Result_2], ['query']),
    'token_identifier' : IDL.Func([IDL.Nat], [IDL.Text], ['query']),
    'tokens_ext' : IDL.Func([IDL.Principal], [NFTResult], ['query']),
    'transfer' : IDL.Func([TransferRequest], [TransferResponse], []),
  });
};
// @ts-ignore
export const init = ({ IDL }) => {
  const InitArgs = IDL.Record({
    'cap' : IDL.Opt(IDL.Principal),
    'logo' : IDL.Opt(IDL.Text),
    'name' : IDL.Opt(IDL.Text),
    'custodians' : IDL.Opt(IDL.Vec(IDL.Principal)),
    'symbol' : IDL.Opt(IDL.Text),
  });
  return [IDL.Opt(InitArgs)];
};