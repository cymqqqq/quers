/* tslint:disable */
// @ts-ignore 
export const idlFactory =  ({ IDL }) => {
    const EventType = IDL.Variant({
      'auctionDeal' : IDL.Null,
      'dutchAuction' : IDL.Null,
      'offer' : IDL.Null,
      'list' : IDL.Null,
      'claim' : IDL.Null,
      'mint' : IDL.Null,
      'sold' : IDL.Null,
      'acceptOffer' : IDL.Null,
      'point' : IDL.Null,
      'auction' : IDL.Null,
      'transfer' : IDL.Null,
    });
    const TokenIdentifier__1 = IDL.Text;
    const Price = IDL.Nat64;
    const Time = IDL.Int;
    const TokenIdentifier = IDL.Text;
    const RecordEventType = IDL.Variant({
      'auctionDeal' : IDL.Null,
      'dutchAuction' : IDL.Null,
      'offer' : IDL.Null,
      'list' : IDL.Null,
      'claim' : IDL.Null,
      'mint' : IDL.Null,
      'sold' : IDL.Null,
      'acceptOffer' : IDL.Null,
      'point' : IDL.Null,
      'auction' : IDL.Null,
      'transfer' : IDL.Null,
    });
    const Event = IDL.Record({
      'to' : IDL.Opt(IDL.Principal),
      'collection' : IDL.Principal,
      'date' : Time,
      'from' : IDL.Opt(IDL.Principal),
      'item' : TokenIdentifier,
      'index' : IDL.Nat,
      'price' : IDL.Opt(Price),
      'eventType' : RecordEventType,
    });
    const PageParam = IDL.Record({ 'page' : IDL.Nat, 'pageCount' : IDL.Nat });
    return IDL.Service({
      'addEvent' : IDL.Func(
          [
            EventType,
            TokenIdentifier__1,
            IDL.Opt(IDL.Principal),
            IDL.Opt(IDL.Principal),
            IDL.Opt(Price),
          ],
          [],
          [],
        ),
      'getCapEventByIndex' : IDL.Func([IDL.Nat], [IDL.Opt(Event)], []),
      'getCollectionEvents' : IDL.Func(
          [IDL.Principal],
          [IDL.Opt(IDL.Vec(Event))],
          ['query'],
        ),
      'getCollectionEventsPageable' : IDL.Func(
          [IDL.Principal, PageParam],
          [IDL.Opt(IDL.Tuple(IDL.Vec(Event), IDL.Nat))],
          ['query'],
        ),
      'getCollectionEventsSize' : IDL.Func(
          [IDL.Principal],
          [IDL.Opt(IDL.Nat)],
          ['query'],
        ),
      'getCollectionEventsWithIndex' : IDL.Func(
          [IDL.Principal, IDL.Nat],
          [IDL.Opt(IDL.Vec(Event))],
          ['query'],
        ),
      'getConfig' : IDL.Func(
          [],
          [
            IDL.Record({
              'oat' : IDL.Principal,
              'yumi' : IDL.Principal,
              'launchpad' : IDL.Principal,
            }),
          ],
          ['query'],
        ),
      'getEventByIndex' : IDL.Func([IDL.Nat], [Event], ['query']),
      'getEventSize' : IDL.Func([], [IDL.Nat], ['query']),
      'getEventsByParam' : IDL.Func(
          [PageParam],
          [IDL.Opt(IDL.Tuple(IDL.Vec(Event), IDL.Nat))],
          ['query'],
        ),
      'getNftEvents' : IDL.Func(
          [TokenIdentifier__1],
          [IDL.Opt(IDL.Vec(Event))],
          ['query'],
        ),
      'getNftEventsPageable' : IDL.Func(
          [TokenIdentifier__1, PageParam],
          [IDL.Opt(IDL.Tuple(IDL.Vec(Event), IDL.Nat))],
          ['query'],
        ),
      'getUserEvents' : IDL.Func(
          [IDL.Principal],
          [IDL.Opt(IDL.Vec(Event))],
          ['query'],
        ),
      'init' : IDL.Func([], [], ['oneway']),
      'setUseCap' : IDL.Func([IDL.Bool], [], ['oneway']),
    });
  };
  // @ts-ignore 

  export const init = ({ IDL }) => { return []; };