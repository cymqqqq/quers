 /* tslint:disable */
// @ts-ignore 
export const idlFactory = ({ IDL }) => {
    const OfferId = IDL.Nat;
    const OfferStatus = IDL.Variant({
        'rejected': IDL.Null,
        'ineffect': IDL.Null,
        'accepted': IDL.Null,
    });
    const TokenIdentifier__4 = IDL.Text;
    const Price__2 = IDL.Nat64;
    const OfferId__1 = IDL.Nat;
    const Offer = IDL.Record({
        'ttl': IDL.Int,
        'status': OfferStatus,
        'tokenIdentifier': TokenIdentifier__4,
        'seller': IDL.Principal,
        'price': Price__2,
        'offerId': OfferId__1,
        'bidder': IDL.Principal,
    });
    const UserId = IDL.Principal;
    const Img__1 = IDL.Text;
    const Links = IDL.Record({
        'twitter': IDL.Opt(IDL.Text),
        'instagram': IDL.Opt(IDL.Text),
        'discord': IDL.Opt(IDL.Text),
        'yoursite': IDL.Opt(IDL.Text),
        'telegram': IDL.Opt(IDL.Text),
        'medium': IDL.Opt(IDL.Text),
    });
    const Price__1 = IDL.Nat64;
    const Category = IDL.Text;
    const Time__1 = IDL.Int;
    const CollectionInfoImmut = IDL.Record({
        'url': IDL.Opt(IDL.Text),
        'creator': UserId,
        'featured': IDL.Opt(Img__1),
        'logo': IDL.Opt(Img__1),
        'name': IDL.Text,
        'banner': IDL.Opt(Img__1),
        'description': IDL.Opt(IDL.Text),
        'links': IDL.Opt(Links),
        'royalties': Price__1,
        'category': IDL.Opt(Category),
        'releaseTime': IDL.Opt(Time__1),
        'canisterId': IDL.Principal,
    });
    const TokenIdentifier__6 = IDL.Text;
    const Price__3 = IDL.Nat64;
    const Listings = IDL.Record({
        'tokenIdentifier': TokenIdentifier__6,
        'price': Price__3,
    });
    const CollectionStatsImmut = IDL.Record({
        'listings': IDL.Vec(Listings),
        'tradeCount': IDL.Nat,
        'createTime': Time__1,
        'floorPrice': Price__1,
        'volumeTrade': Price__1,
    });
    const TokenIdentifier__5 = IDL.Text;
    const NFTStatsImmut = IDL.Record({
        'lastPrice': Price__3,
        'listTime': IDL.Opt(Time__1),
        'views': IDL.Vec(IDL.Principal),
        'favoriters': IDL.Vec(IDL.Principal),
    });
    const BackupEntries = IDL.Variant({
        'collections': IDL.Vec(IDL.Tuple(IDL.Principal, CollectionInfoImmut)),
        'collectionStats': IDL.Vec(IDL.Tuple(IDL.Principal, CollectionStatsImmut)),
        'nftStats': IDL.Vec(IDL.Tuple(TokenIdentifier__5, NFTStatsImmut)),
    });
    const Result_13 = IDL.Variant({ 'ok': BackupEntries, 'err': IDL.Text });
    const Result_12 = IDL.Variant({ 'ok': IDL.Null, 'err': IDL.Text });
    const SettleICPResult = IDL.Variant({
        'ok': IDL.Null,
        'err': IDL.Variant({
            'NoSettleICP': IDL.Null,
            'SettleErr': IDL.Null,
            'RetryExceed': IDL.Null,
        }),
    });
    const TokenIdentifier__3 = IDL.Text;
    const Fee__1 = IDL.Record({ 'platform': Price__1, 'royalties': Price__1 });
    const TradeType = IDL.Variant({
        'fixed': IDL.Null,
        'offer': IDL.Null,
        'auction': IDL.Null,
    });
    const AccountIdentifier = IDL.Text;
    const User__3 = IDL.Variant({
        'principal': IDL.Principal,
        'address': AccountIdentifier,
    });
    const Order = IDL.Record({
        'fee': Fee__1,
        'tokenIdentifier': TokenIdentifier__4,
        'tradeType': TradeType,
        'memo': IDL.Nat64,
        'time': IDL.Int,
        'seller': User__3,
        'buyer': User__3,
        'price': Price__2,
    });
    const Err = IDL.Variant({
        'offerExpired': IDL.Null,
        'auctionFail': IDL.Null,
        'nftNotAuction': IDL.Null,
        'other': IDL.Text,
        'nftAlreadyListing': IDL.Null,
        'notFoundOffer': IDL.Null,
        'nftNotlist': IDL.Null,
        'nftlockedByOther': IDL.Null,
    });
    const TradeResult = IDL.Variant({ 'ok': Order, 'err': Err });
    const StatsListings = IDL.Record({
        'tokenIdentifier': TokenIdentifier__6,
        'price': Price__3,
    });
    const Price = IDL.Nat64;
    const CollectionInit = IDL.Record({
        'url': IDL.Opt(IDL.Text),
        'featured': IDL.Opt(Img__1),
        'logo': IDL.Opt(Img__1),
        'name': IDL.Opt(IDL.Text),
        'banner': IDL.Opt(Img__1),
        'description': IDL.Opt(IDL.Text),
        'links': IDL.Opt(Links),
        'royalties': Price__1,
        'category': IDL.Opt(Category),
        'releaseTime': IDL.Opt(Time__1),
        'openTime': IDL.Opt(Time__1),
    });
    const CollectionErr = IDL.Variant({
        'perMaxCollNum': IDL.Null,
        'guestCannotCreateCollection': IDL.Null,
        'maxCollNum': IDL.Null,
    });
    const Result_11 = IDL.Variant({
        'ok': IDL.Principal,
        'err': CollectionErr,
    });
    const Img = IDL.Text;
    const NewProfile = IDL.Record({
        'bio': IDL.Text,
        'userName': IDL.Text,
        'banner': Img,
        'notification': IDL.Vec(IDL.Text),
        'email': IDL.Text,
        'avatar': Img,
    });
    const ProfileErr = IDL.Variant({
        'alreadyCreate': IDL.Null,
        'noProfile': IDL.Null,
        'defaultAccount': IDL.Null,
    });
    const Result_10 = IDL.Variant({ 'ok': IDL.Null, 'err': ProfileErr });
    const TokenIdentifier__7 = IDL.Text;
    const UserId__2 = IDL.Principal;
    const OfferId__2 = IDL.Nat;
    const ProfileLet = IDL.Record({
        'bio': IDL.Text,
        'userName': IDL.Text,
        'created': IDL.Vec(TokenIdentifier__7),
        'favorited': IDL.Vec(TokenIdentifier__7),
        'userId': UserId__2,
        'time': Time__1,
        'banner': Img,
        'notification': IDL.Vec(IDL.Text),
        'offersReceived': IDL.Vec(OfferId__2),
        'collections': IDL.Vec(IDL.Principal),
        'email': IDL.Text,
        'collected': IDL.Vec(TokenIdentifier__7),
        'offersMade': IDL.Vec(OfferId__2),
        'followeds': IDL.Vec(UserId__2),
        'followers': IDL.Vec(UserId__2),
        'avatar': Img,
    });
    const Result_9 = IDL.Variant({ 'ok': ProfileLet, 'err': ProfileErr });
    const User__2 = IDL.Variant({
        'principal': IDL.Principal,
        'address': AccountIdentifier,
    });
    const definite_canister_settings = IDL.Record({
        'freezing_threshold': IDL.Nat,
        'controllers': IDL.Opt(IDL.Vec(IDL.Principal)),
        'memory_allocation': IDL.Nat,
        'compute_allocation': IDL.Nat,
    });
    const CollectionCreatorData = IDL.Record({
        'bio': IDL.Text,
        'userName': IDL.Text,
        'userId': UserId,
        'time': Time__1,
        'avatar': Img__1,
    });
    const CollectionInfo__1 = IDL.Record({
        'url': IDL.Opt(IDL.Text),
        'creator': UserId,
        'featured': IDL.Opt(Img__1),
        'logo': IDL.Opt(Img__1),
        'name': IDL.Text,
        'banner': IDL.Opt(Img__1),
        'description': IDL.Opt(IDL.Text),
        'links': IDL.Opt(Links),
        'royalties': Price__1,
        'category': IDL.Opt(Category),
        'releaseTime': IDL.Opt(Time__1),
        'canisterId': IDL.Principal,
    });
    const CollectionData = IDL.Record({
        'creator': IDL.Opt(CollectionCreatorData),
        'info': CollectionInfo__1,
        'stats': IDL.Opt(CollectionStatsImmut),
    });
    const AccountIdentifier__4 = IDL.Text;
    const ICPRefund = IDL.Record({
        'memo': IDL.Nat64,
        'user': AccountIdentifier__4,
        'price': IDL.Nat64,
        'retry': IDL.Nat64,
    });
    const ICPSale = IDL.Record({
        'memo': IDL.Nat64,
        'user': IDL.Principal,
        'price': IDL.Nat64,
        'retry': IDL.Nat64,
    });
    const Fee = IDL.Record({ 'platform': Price__1, 'royalties': Price__1 });
    const Fixed = IDL.Record({
        'fee': Fee,
        'tokenIdentifier': TokenIdentifier__5,
        'seller': IDL.Principal,
        'price': Price__1,
    });
    const Auction = IDL.Record({
        'fee': Fee,
        'ttl': IDL.Int,
        'highestBidder': IDL.Opt(IDL.Principal),
        'tokenIdentifier': TokenIdentifier__5,
        'seller': IDL.Principal,
        'resevePrice': IDL.Opt(Price__1),
        'highestPrice': IDL.Opt(Price__1),
        'startPrice': Price__1,
    });
    const Listing__2 = IDL.Variant({
        'fixed': Fixed,
        'unlist': IDL.Null,
        'auction': Auction,
    });
    const PointSale = IDL.Record({
        'user': User__2,
        'price': IDL.Nat64,
        'retry': IDL.Nat64,
    });
    const RecordEventType = IDL.Variant({
        'auctionDeal': IDL.Null,
        'offer': IDL.Null,
        'list': IDL.Null,
        'claim': IDL.Null,
        'mint': IDL.Null,
        'sold': IDL.Null,
        'acceptOffer': IDL.Null,
        'point': IDL.Null,
        'auction': IDL.Null,
        'transfer': IDL.Null,
    });
    const RecordEventInit = IDL.Record({
        'to': IDL.Opt(IDL.Principal),
        'toAID': IDL.Opt(AccountIdentifier__4),
        'collection': IDL.Principal,
        'date': IDL.Int,
        'from': IDL.Opt(IDL.Principal),
        'item': TokenIdentifier__5,
        'fromAID': IDL.Opt(AccountIdentifier__4),
        'price': IDL.Opt(Price__1),
        'eventType': RecordEventType,
    });
    const RecordSettle = IDL.Record({
        'retry': IDL.Nat64,
        'record': RecordEventInit,
    });
    const Result_8 = IDL.Variant({ 'ok': IDL.Null, 'err': CollectionErr });
    const CollectionFilterArgs = IDL.Record({
        'creator': IDL.Opt(IDL.Vec(UserId)),
        'name': IDL.Opt(IDL.Text),
        'category': IDL.Opt(IDL.Vec(IDL.Text)),
    });
    const CollectionSortingField = IDL.Variant({
        'listingNumber': IDL.Null,
        'name': IDL.Null,
        'createTime': IDL.Null,
        'floorPrice': IDL.Null,
        'volumeTrade': IDL.Null,
    });
    const CollectionSortFilterArgs = IDL.Record({
        'filterArgs': CollectionFilterArgs,
        'offset': IDL.Nat,
        'limit': IDL.Nat,
        'ascending': IDL.Bool,
        'sortingField': CollectionSortingField,
    });
    const UserId__1 = IDL.Principal;
    const CreatorInfo = IDL.Record({
        'userName': IDL.Text,
        'user': UserId__1,
        'canister': IDL.Principal,
    });
    const ListResult = IDL.Variant({ 'ok': IDL.Null, 'err': Err });
    const CollectionInfo = IDL.Record({
        'url': IDL.Opt(IDL.Text),
        'creator': UserId,
        'featured': IDL.Opt(Img__1),
        'logo': IDL.Opt(Img__1),
        'name': IDL.Text,
        'banner': IDL.Opt(Img__1),
        'description': IDL.Opt(IDL.Text),
        'links': IDL.Opt(Links),
        'royalties': Price__1,
        'category': IDL.Opt(Category),
        'releaseTime': IDL.Opt(Time__1),
        'canisterId': IDL.Principal,
    });
    const NFTInfo = IDL.Record({
        'listing': Listing__2,
        'lastPrice': Price__1,
        'listTime': IDL.Opt(Time__1),
        'views': IDL.Nat,
        'favoriters': IDL.Vec(IDL.Principal),
    });
    const PageParam = IDL.Record({ 'page': IDL.Nat, 'pageCount': IDL.Nat });
    const AccountIdentifier__3 = IDL.Text;
    const User__1 = IDL.Variant({
        'principal': IDL.Principal,
        'address': AccountIdentifier,
    });
    const NewFixed = IDL.Record({
        'tokenIdentifier': TokenIdentifier__4,
        'price': Price__2,
    });
    const SettlePointResult = IDL.Variant({
        'ok': IDL.Null,
        'err': IDL.Variant({
            'NoSettlePoint': IDL.Null,
            'SettleErr': IDL.Null,
            'RetryExceed': IDL.Null,
        }),
    });
    const SettleRecordResult = IDL.Variant({
        'ok': IDL.Null,
        'err': IDL.Variant({
            'NoSettleRecord': IDL.Null,
            'SettleErr': IDL.Null,
            'RetryExceed': IDL.Null,
        }),
    });
    const VerifyResult = IDL.Variant({
        'ok': IDL.Null,
        'err': IDL.Variant({
            'NotList': IDL.Null,
            'NotSell': IDL.Null,
            'VerifyTxErr': IDL.Null,
            'CannotNotify': AccountIdentifier__3,
            'InsufficientBalance': IDL.Null,
            'TxNotFound': IDL.Null,
            'InvalidToken': TokenIdentifier__3,
            'Rejected': IDL.Null,
            'Unauthorized': AccountIdentifier__3,
            'Other': IDL.Text,
        }),
    });
    const BlockIndex = IDL.Nat64;
    const ICP = IDL.Record({ 'e8s': IDL.Nat64 });
    const TransferError = IDL.Variant({
        'TxTooOld': IDL.Record({ 'allowed_window_nanos': IDL.Nat64 }),
        'BadFee': IDL.Record({ 'expected_fee': ICP }),
        'TxDuplicate': IDL.Record({ 'duplicate_of': BlockIndex }),
        'Other': IDL.Text,
        'TxCreatedInFuture': IDL.Null,
        'InsufficientFunds': IDL.Record({ 'balance': ICP }),
    });
    const TransferResult = IDL.Variant({
        'ok': BlockIndex,
        'err': TransferError,
    });
    const Platform = IDL.Service({
        'acceptOffer': IDL.Func([OfferId], [Offer], []),
        'addCanisterController': IDL.Func(
            [IDL.Principal, IDL.Principal],
            [],
            ['oneway'],
        ),
        'addCreator_whitelist': IDL.Func([IDL.Vec(IDL.Principal)], [], []),
        'backupGetEntries': IDL.Func(
            [IDL.Text, IDL.Nat, IDL.Nat],
            [Result_13],
            [],
        ),
        'backupGetSize': IDL.Func([], [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Nat))], []),
        'backupPutEntries': IDL.Func([IDL.Text, BackupEntries], [Result_12], []),
        'balance': IDL.Func([], [IDL.Nat], []),
        'batchSettleICP': IDL.Func(
            [IDL.Vec(IDL.Nat)],
            [IDL.Vec(SettleICPResult)],
            [],
        ),
        'batchSettleICPRefund': IDL.Func([IDL.Vec(IDL.Nat)], [], []),
        'batchSettleRecord': IDL.Func([IDL.Vec(IDL.Nat)], [], []),
        'buyNow': IDL.Func([TokenIdentifier__3], [TradeResult], []),
        'cancelOffer': IDL.Func([OfferId], [IDL.Bool], []),
        'checkTx': IDL.Func([IDL.Vec(TokenIdentifier__3)], [], []),
        'collectionStats': IDL.Func(
            [IDL.Principal],
            [
                IDL.Opt(
                    IDL.Record({
                        'listings': IDL.Vec(StatsListings),
                        'tradeCount': IDL.Nat,
                        'createTime': Time__1,
                        'floorPrice': Price,
                        'volumeTrade': Price,
                    })
                ),
            ],
            ['query'],
        ),
        'createCollection': IDL.Func([CollectionInit], [Result_11], []),
        'createProfile': IDL.Func([NewProfile], [Result_10], []),
        'createProfile4User': IDL.Func(
            [IDL.Principal, NewProfile],
            [Result_10],
            [],
        ),
        'created': IDL.Func([TokenIdentifier__3, IDL.Principal], [], []),
        'delCreator_whitelist': IDL.Func([IDL.Vec(IDL.Principal)], [], []),
        'deleteCanister': IDL.Func([IDL.Principal], [], []),
        'deleteWait': IDL.Func([TokenIdentifier__3], [], []),
        'deleteWaitByHeight': IDL.Func([IDL.Nat], [], []),
        'favorite': IDL.Func([TokenIdentifier__3], [], []),
        'findOfferById': IDL.Func([OfferId], [IDL.Opt(Offer)], []),
        'findOfferByNft': IDL.Func(
            [TokenIdentifier__3],
            [IDL.Vec(Offer)],
            ['query'],
        ),
        'findProfile': IDL.Func([], [Result_9], ['query']),
        'findProfileWho': IDL.Func([User__2], [Result_9], ['query']),
        'flushICPRefundSettlement': IDL.Func([], [], []),
        'flushICPSettlement': IDL.Func([], [], []),
        'flushPointSettlement': IDL.Func([], [], []),
        'flushRecordSettlement': IDL.Func([], [], []),
        'follow': IDL.Func([IDL.Principal], [], []),
        'getCanisterSettings': IDL.Func(
            [IDL.Principal],
            [definite_canister_settings],
            [],
        ),
        'getCollectionData': IDL.Func(
            [IDL.Principal],
            [IDL.Opt(CollectionData)],
            ['query'],
        ),
        'getConfig': IDL.Func(
            [],
            [
                IDL.Record({
                    'platformFeeAccount': IDL.Principal,
                    'owner': IDL.Principal,
                    'lanuchpad': IDL.Principal,
                    'block': IDL.Text,
                    'ledeger': IDL.Text,
                    'point': IDL.Principal,
                    'record': IDL.Principal,
                }),
            ],
            ['query'],
        ),
        'getCreator_whitelist': IDL.Func([], [IDL.Vec(IDL.Principal)], ['query']),
        'getICPRefundSettlements': IDL.Func(
            [],
            [IDL.Vec(IDL.Tuple(IDL.Nat, ICPRefund))],
            ['query'],
        ),
        'getICPSettlements': IDL.Func(
            [],
            [IDL.Vec(IDL.Tuple(IDL.Nat, ICPSale))],
            ['query'],
        ),
        'getListingByHeight': IDL.Func([IDL.Nat64], [IDL.Opt(Listing__2)], []),
        'getListingByTid': IDL.Func([IDL.Nat], [IDL.Opt(Listing__2)], []),
        'getOwner': IDL.Func([], [IDL.Principal], []),
        'getPointSettlements': IDL.Func(
            [],
            [IDL.Vec(IDL.Tuple(IDL.Nat, PointSale))],
            ['query'],
        ),
        'getRecordSettlement': IDL.Func(
            [],
            [IDL.Vec(IDL.Tuple(IDL.Nat, RecordSettle))],
            ['query'],
        ),
        'importCollection': IDL.Func(
            [IDL.Principal, IDL.Text, CollectionInit],
            [Result_8],
            [],
        ),
        'listCollected': IDL.Func([], [IDL.Vec(TokenIdentifier__3)], ['query']),
        'listCollections': IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
        'listCollections2': IDL.Func(
            [IDL.Opt(CollectionSortFilterArgs)],
            [IDL.Vec(CollectionData)],
            ['query'],
        ),
        'listCreated': IDL.Func([], [IDL.Vec(TokenIdentifier__3)], ['query']),
        'listCreators': IDL.Func([], [IDL.Vec(CreatorInfo)], []),
        'listFavorite': IDL.Func([], [IDL.Vec(TokenIdentifier__3)], ['query']),
        'listOfferMade': IDL.Func([], [IDL.Vec(Offer)], ['query']),
        'listOfferReceived': IDL.Func([], [IDL.Vec(Offer)], ['query']),
        'listedDataRecovery': IDL.Func(
            [IDL.Principal, Price, TokenIdentifier__3],
            [ListResult],
            [],
        ),
        'listfolloweds': IDL.Func([], [IDL.Vec(IDL.Principal)], ['query']),
        'listfollowers': IDL.Func([], [IDL.Vec(IDL.Principal)], ['query']),
        'myCollectionList': IDL.Func([], [IDL.Vec(CollectionInfo)], ['query']),
        'nftInfo': IDL.Func([TokenIdentifier__3], [NFTInfo], ['query']),
        'nftInfos': IDL.Func(
            [IDL.Vec(TokenIdentifier__3)],
            [IDL.Vec(NFTInfo)],
            ['query'],
        ),
        'nftInfosByCollection': IDL.Func(
            [IDL.Principal, IDL.Vec(IDL.Nat32)],
            [IDL.Vec(NFTInfo)],
            ['query'],
        ),
        'nftInfosByCollectionPageable': IDL.Func(
            [IDL.Principal, PageParam],
            [IDL.Vec(NFTInfo)],
            ['query'],
        ),
        'queryPlatformFee': IDL.Func(
            [],
            [
                IDL.Record({
                    'fee': Price,
                    'precision': IDL.Nat64,
                    'account': AccountIdentifier__3,
                }),
            ],
            ['query'],
        ),
        'queryPointRatio': IDL.Func([], [IDL.Nat64], ['query']),
        'querySortedCollection': IDL.Func(
            [
                CollectionSortingField,
                IDL.Bool,
                IDL.Nat,
                IDL.Nat,
                CollectionFilterArgs,
            ],
            [IDL.Vec(IDL.Principal)],
            [],
        ),
        'recordPoint': IDL.Func([User__1, Price], [], []),
        'rejectOffer': IDL.Func([OfferId], [], []),
        'removeCollection': IDL.Func([IDL.Principal, IDL.Text], [Result_8], []),
        'sell': IDL.Func([NewFixed], [ListResult], []),
        'setICPRefundSettlements': IDL.Func(
            [IDL.Nat, AccountIdentifier__3, IDL.Nat64, IDL.Nat64],
            [],
            [],
        ),
        'setICPSettlements': IDL.Func(
            [IDL.Nat, IDL.Principal, IDL.Nat64, IDL.Nat64],
            [],
            [],
        ),
        'setMinter': IDL.Func([IDL.Principal, IDL.Text], [], []),
        'setOwner': IDL.Func([IDL.Principal], [], []),
        'setPlatformAccount': IDL.Func([IDL.Principal], [], []),
        'setPlatformFee': IDL.Func([IDL.Nat64, IDL.Nat64], [], []),
        'setPointRatio': IDL.Func([IDL.Nat64], [], []),
        'setPointSettlements': IDL.Func(
            [IDL.Nat, IDL.Principal, IDL.Nat64],
            [],
            [],
        ),
        'setRateLimit': IDL.Func([IDL.Nat, IDL.Nat], [], []),
        'setRateLimitFalse': IDL.Func([], [], []),
        'setWICP': IDL.Func([IDL.Text], [], []),
        'settleICP': IDL.Func([IDL.Nat], [SettleICPResult], []),
        'settleICPRefund': IDL.Func([IDL.Nat], [SettleICPResult], []),
        'settlePoint': IDL.Func([IDL.Nat], [SettlePointResult], []),
        'settleRecord': IDL.Func([IDL.Nat], [SettleRecordResult], []),
        'subscribe': IDL.Func([IDL.Text], [], []),
        'unSell': IDL.Func([TokenIdentifier__3], [ListResult], []),
        'unfavorite': IDL.Func([TokenIdentifier__3], [], []),
        'unfollow': IDL.Func([IDL.Principal], [], []),
        'updateCollection': IDL.Func([CollectionInfo], [IDL.Bool], []),
        'updateCreators': IDL.Func([], [IDL.Text], []),
        'updateOffer': IDL.Func([OfferId, Price], [IDL.Bool], []),
        'updateProfile': IDL.Func([NewProfile], [IDL.Bool], []),
        'verifyTx': IDL.Func([IDL.Nat64], [VerifyResult], []),
        'verifyTxWithMemo': IDL.Func([IDL.Nat64], [VerifyResult], []),
        'view': IDL.Func([TokenIdentifier__3], [], []),
        'volumeTraded': IDL.Func([IDL.Principal, Price], [], []),
        'wallet_receive': IDL.Func([], [IDL.Nat], []),
        'withdraw': IDL.Func(
            [AccountIdentifier__3, Price, IDL.Nat64],
            [TransferResult],
            [],
        ),
    });
    return Platform;
};
// @ts-ignore
export const init = ({ IDL }) => { return []; };