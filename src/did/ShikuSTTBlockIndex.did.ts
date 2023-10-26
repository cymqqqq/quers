/* tslint:disable */
// @ts-ignore 
export const idlFactory =  ({ IDL }) => {

    const Subaccount = IDL.Vec(IDL.Nat8);
    const Account = IDL.Record({
      'owner' : IDL.Principal,
      'subaccount' : IDL.Opt(Subaccount),
    });
    const Balance = IDL.Nat;
    const Burn = IDL.Record({
      'from' : Account,
      'memo' : IDL.Opt(IDL.Vec(IDL.Nat8)),
      'created_at_time' : IDL.Opt(IDL.Nat64),
      'amount' : Balance,
    });
    const Mint = IDL.Record({
      'to' : Account,
      'memo' : IDL.Opt(IDL.Vec(IDL.Nat8)),
      'created_at_time' : IDL.Opt(IDL.Nat64),
      'amount' : Balance,
    });
    const Timestamp = IDL.Nat64;
    const TxIndex = IDL.Nat;
    const Transfer = IDL.Record({
      'to' : Account,
      'fee' : IDL.Opt(Balance),
      'from' : Account,
      'memo' : IDL.Opt(IDL.Vec(IDL.Nat8)),
      'created_at_time' : IDL.Opt(IDL.Nat64),
      'amount' : Balance,
    });
    const Transaction__1 = IDL.Record({
      'burn' : IDL.Opt(Burn),
      'kind' : IDL.Text,
      'mint' : IDL.Opt(Mint),
      'timestamp' : Timestamp,
      'index' : TxIndex,
      'transfer' : IDL.Opt(Transfer),
    });
    const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
    const GetTransactionsRequest = IDL.Record({
      'start' : TxIndex,
      'length' : IDL.Nat,
    });
    const Transaction = IDL.Record({
      'burn' : IDL.Opt(Burn),
      'kind' : IDL.Text,
      'mint' : IDL.Opt(Mint),
      'timestamp' : Timestamp,
      'index' : TxIndex,
      'transfer' : IDL.Opt(Transfer),
    });
    const TransactionRange = IDL.Record({
      'transactions' : IDL.Vec(Transaction),
    });
    return IDL.Service({
      'append_transactions' : IDL.Func([IDL.Vec(Transaction__1)], [Result], []),
      'deposit_cycles' : IDL.Func([], [], []),
      'get_transaction' : IDL.Func(
          [TxIndex],
          [IDL.Opt(Transaction__1)],
          ['query'],
        ),
      'get_transactions' : IDL.Func(
          [GetTransactionsRequest],
          [TransactionRange],
          ['query'],
        ),
      'remaining_capacity' : IDL.Func([], [IDL.Nat], ['query']),
      'total_transactions' : IDL.Func([], [IDL.Nat], ['query']),
    });
  };
      // @ts-ignore

  export const init = ({ IDL }) => { return []; };