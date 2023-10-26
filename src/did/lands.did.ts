/* tslint:disable */
// @ts-ignore 
export const landsIdlFactory =  ({ IDL }) => {
    const DetailValue = IDL.Rec();
    const GenericValue = IDL.Rec();
    const InitArgs = IDL.Record({
      'cap' : IDL.Opt(IDL.Principal),
      'logo' : IDL.Opt(IDL.Text),
      'name' : IDL.Opt(IDL.Text),
      'custodians' : IDL.Opt(IDL.Vec(IDL.Principal)),
      'symbol' : IDL.Opt(IDL.Text),
    });
    const User = IDL.Variant({
      'principal' : IDL.Principal,
      'address' : IDL.Text,
    });
    const AllowanceRequest = IDL.Record({
      'token' : IDL.Text,
      'owner' : User,
      'spender' : IDL.Principal,
    });
    const CommonError = IDL.Variant({
      'InvalidToken' : IDL.Text,
      'Other' : IDL.Text,
    });
    const Result__1_2 = IDL.Variant({ 'ok' : IDL.Nat, 'err' : CommonError });
    const ApproveRequest = IDL.Record({
      'token' : IDL.Text,
      'subaccount' : IDL.Opt(IDL.Vec(IDL.Nat8)),
      'allowance' : IDL.Nat,
      'spender' : IDL.Principal,
    });
    const Result__1_1 = IDL.Variant({ 'ok' : IDL.Text, 'err' : CommonError });
    const MetadataShikuFungibleDetails = IDL.Record({
      'decimals' : IDL.Nat8,
      'metadata' : IDL.Opt(IDL.Vec(IDL.Nat8)),
      'name' : IDL.Text,
    });
    const MetadataShikuNonFungibleDetails = IDL.Record({
      'metadata' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    });
    const TokenMetadata = IDL.Variant({
      'fungible' : MetadataShikuFungibleDetails,
      'nonfungible' : MetadataShikuNonFungibleDetails,
    });
    const Coordinate = IDL.Record({ 'x' : IDL.Nat64, 'y' : IDL.Nat64 });
    const LandType = IDL.Variant({
      'Landtype1' : IDL.Null,
      'Landtype2' : IDL.Null,
    });
    const LandStatus = IDL.Variant({
      'Status1' : IDL.Null,
      'Status2' : IDL.Null,
    });
    const LandProperty = IDL.Record({
      'id' : IDL.Nat64,
      'pos' : Coordinate,
      'image_url' : IDL.Vec(IDL.Text),
      'planet' : IDL.Text,
      'owner' : IDL.Opt(IDL.Text),
      'area' : IDL.Text,
      'name' : IDL.Text,
      'borrower' : IDL.Opt(IDL.Text),
      'price_for_borrow' : IDL.Nat64,
      'land_type' : LandType,
      'expiration' : IDL.Nat64,
      'rent_cycle' : IDL.Nat64,
      'dimension' : IDL.Text,
      'planet_id' : IDL.Opt(IDL.Text),
      'number' : IDL.Text,
      'land_price' : IDL.Nat64,
      'land_status' : LandStatus,
      'can_borrow' : IDL.Bool,
    });
    const Result = IDL.Variant({ 'Ok' : TokenMetadata, 'Err' : CommonError });
    const MintRequest = IDL.Record({
      'to' : IDL.Principal,
      'slotdata' : IDL.Nat32,
      'land_id' : IDL.Nat32,
    });
    GenericValue.fill(
      IDL.Variant({
        'Nat64Content' : IDL.Opt(IDL.Nat64),
        'Nat32Content' : IDL.Nat32,
        'BoolContent' : IDL.Bool,
        'Nat8Content' : IDL.Nat8,
        'Int64Content' : IDL.Int64,
        'IntContent' : IDL.Int,
        'NatContent' : IDL.Nat,
        'Nat16Content' : IDL.Nat16,
        'Int32Content' : IDL.Int32,
        'Int8Content' : IDL.Int8,
        'FloatContent' : IDL.Float64,
        'Int16Content' : IDL.Int16,
        'BlobContent' : IDL.Vec(IDL.Nat8),
        'NestedContent' : IDL.Vec(IDL.Tuple(IDL.Text, GenericValue)),
        'AccountIdentifier_Shiku' : IDL.Opt(IDL.Text),
        'TextContent' : IDL.Text,
      })
    );
    const MintResponse = IDL.Record({
      'tokenidx' : IDL.Nat,
      'metadata' : IDL.Vec(GenericValue),
      'slotdata' : IDL.Nat,
    });
    const Result_1 = IDL.Variant({ 'Ok' : MintResponse, 'Err' : CommonError });
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
    const Result_2 = IDL.Variant({ 'ok' : IDL.Nat, 'err' : CommonError });
    const Listing = IDL.Record({
      'locked' : IDL.Opt(IDL.Int),
      'seller' : IDL.Text,
      'price' : IDL.Nat64,
    });
    const NFTResult = IDL.Variant({
      'ok' : IDL.Vec(
        IDL.Tuple(IDL.Nat32, IDL.Opt(Listing), IDL.Opt(IDL.Vec(IDL.Nat8)))
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
      'add_land_image_url' : IDL.Func([IDL.Nat, IDL.Text], [], []),
      'allowance' : IDL.Func([AllowanceRequest], [Result__1_2], ['query']),
      'approve' : IDL.Func([ApproveRequest], [IDL.Bool], []),
      'bearer' : IDL.Func([IDL.Text], [Result__1_1], ['query']),
      'clear_minted' : IDL.Func([], [], []),
      'delete_land_image_url' : IDL.Func([IDL.Nat, IDL.Nat64], [], []),
      'encoded_token' : IDL.Func([IDL.Text], [IDL.Text], ['query']),
      'getAllSlots' : IDL.Func(
          [],
          [IDL.Vec(IDL.Tuple(IDL.Nat, IDL.Nat))],
          ['query'],
        ),
      'getMinter' : IDL.Func([], [IDL.Principal], ['query']),
      'getRegistry' : IDL.Func(
          [],
          [IDL.Vec(IDL.Tuple(IDL.Nat32, IDL.Text))],
          ['query'],
        ),
      'getTokens' : IDL.Func(
          [],
          [IDL.Vec(IDL.Tuple(IDL.Nat32, TokenMetadata))],
          ['query'],
        ),
      'getTokensByIds' : IDL.Func(
          [IDL.Vec(IDL.Nat32)],
          [IDL.Vec(IDL.Tuple(IDL.Nat32, TokenMetadata))],
          ['query'],
        ),
      'get_land_owner' : IDL.Func([IDL.Nat], [IDL.Text], ['query']),
      'init_land' : IDL.Func([], [IDL.Vec(IDL.Tuple(IDL.Nat, LandProperty))], []),
      'land_image_url' : IDL.Func([IDL.Nat], [IDL.Vec(IDL.Text)], ['query']),
      'land_image_url_len' : IDL.Func([IDL.Nat], [IDL.Nat64], ['query']),
      'land_info' : IDL.Func(
          [],
          [IDL.Vec(IDL.Tuple(IDL.Nat, LandProperty))],
          ['query'],
        ),
      'land_info_by_id' : IDL.Func([IDL.Nat], [LandProperty], ['query']),
      'land_price' : IDL.Func([IDL.Nat], [IDL.Nat64], ['query']),
      'land_status' : IDL.Func([IDL.Nat], [LandStatus], ['query']),
      'land_type' : IDL.Func([IDL.Nat], [LandType], ['query']),
      'metadata' : IDL.Func([IDL.Text], [Result], ['query']),
      'mint' : IDL.Func([MintRequest], [Result_1], []),
      'minted' : IDL.Func([], [IDL.Vec(IDL.Nat)], ['query']),
      'pending_transactions' : IDL.Func(
          [],
          [IDL.Vec(IndefiniteEvent)],
          ['query'],
        ),
      'setMinter' : IDL.Func([IDL.Principal], [], []),
      'set_land_image_url' : IDL.Func([IDL.Nat, IDL.Text, IDL.Nat64], [], []),
      'supply' : IDL.Func([], [Result_2], ['query']),
      'token_identifier' : IDL.Func([IDL.Nat], [IDL.Text], ['query']),
      'tokens_ext' : IDL.Func([IDL.Text], [NFTResult], ['query']),
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