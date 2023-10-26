/* tslint:disable */
// @ts-ignore 
export const idlFactory = ({ IDL }) => {
    const Account = IDL.Record({
      'owner' : IDL.Principal,
      'subaccount' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    });
    const CreateArg = IDL.Record({
      'supply_cap' : IDL.Opt(IDL.Nat),
      'name' : IDL.Text,
      'description' : IDL.Opt(IDL.Text),
      'royalties' : IDL.Opt(IDL.Nat16),
      'image' : IDL.Opt(IDL.Vec(IDL.Nat8)),
      'royalties_recipient' : IDL.Opt(Account),
      'symbol' : IDL.Text,
      'wasm_name' : IDL.Text,
    });
    const MintArgs = IDL.Record({
      'id' : IDL.Nat,
      'to' : Account,
      'name' : IDL.Text,
      'canister_id' : IDL.Text,
      'description' : IDL.Opt(IDL.Text),
      'image' : IDL.Text,
      'canister_name' : IDL.Text,
    });
    const MintResponse = IDL.Variant({
      'ok' : IDL.Nat,
      'err' : IDL.Text,
      'other' : IDL.Text,
    });
    return IDL.Service({
      'create_collection' : IDL.Func([CreateArg], [IDL.Principal], []),
      'mint_proxy' : IDL.Func([MintArgs], [MintResponse], []),
    });
  };
  // @ts-ignore

  export const init = ({ IDL }) => { return []; };