  /* tslint:disable */
// @ts-ignore 
export const idlFactory =  ({ IDL }) => {
    const Memo = IDL.Nat64;
    const TimeStamp = IDL.Record({ 'timestamp_nanos' : IDL.Nat64 });
    const AccountIdentifier = IDL.Text;
    const ICPTs = IDL.Record({ 'e8s' : IDL.Nat64 });
    const Transfer = IDL.Variant({
      'Burn' : IDL.Record({ 'from' : AccountIdentifier, 'amount' : ICPTs }),
      'Mint' : IDL.Record({ 'to' : AccountIdentifier, 'amount' : ICPTs }),
      'Send' : IDL.Record({
        'to' : AccountIdentifier,
        'from' : AccountIdentifier,
        'amount' : ICPTs,
      }),
    });
    const Transaction = IDL.Record({
      'memo' : Memo,
      'created_at_time' : TimeStamp,
      'transfer' : Transfer,
    });
    const Hash = IDL.Opt(IDL.Record({ 'inner' : IDL.Vec(IDL.Nat8) }));
    const Block = IDL.Record({
      'transaction' : Transaction,
      'timestamp' : TimeStamp,
      'parent_hash' : Hash,
    });
    const CanisterId = IDL.Principal;
    const Certification = IDL.Vec(IDL.Nat8);
    const BlockHeight = IDL.Nat64;
    const TipOfChain = IDL.Record({
      'certification' : IDL.Opt(Certification),
      'tip_index' : BlockHeight,
    });
    return IDL.Service({
      'block' : IDL.Func(
          [IDL.Nat64],
          [
            IDL.Variant({
              'Ok' : IDL.Variant({ 'Ok' : Block, 'Err' : CanisterId }),
              'Err' : IDL.Text,
            }),
          ],
          [],
        ),
      'tip_of_chain' : IDL.Func(
          [],
          [IDL.Variant({ 'Ok' : TipOfChain, 'Err' : IDL.Text })],
          [],
        ),
    });
  };
  // @ts-ignore 
  export const init = ({ IDL }) => { return []; };