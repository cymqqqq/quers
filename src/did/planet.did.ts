// @ts-ignore 
export const idlFactory = ({ IDL }) => {
    const QueryCategory = IDL.Rec();
    const QueryComment = IDL.Rec();
    const ArticleStatus = IDL.Variant({
        'Subcribe': IDL.Null,
        'Private': IDL.Null,
        'Draft': IDL.Null,
        'Public': IDL.Null,
        'Delete': IDL.Null,
    });
    const ArticleType = IDL.Variant({
        'Photos': IDL.Null,
        'Article': IDL.Null,
        'Shortle': IDL.Null,
        'Audio': IDL.Null,
        'Video': IDL.Null,
    });
    const ArticleArgs = IDL.Record({
        'id': IDL.Text,
        'status': ArticleStatus,
        'thumb': IDL.Text,
        'title': IDL.Text,
        'content': IDL.Text,
        'subcate': IDL.Nat,
        'atype': ArticleType,
        'cate': IDL.Nat,
        'tags': IDL.Vec(IDL.Text),
        'fromurl': IDL.Text,
        'abstract': IDL.Text,
        'allowComment': IDL.Bool,
        'original': IDL.Bool,
    });
    const OpResult = IDL.Variant({
        'Ok': IDL.Record({ 'data': IDL.Text }),
        'Err': IDL.Text,
    });
    const CommentArgs = IDL.Record({ 'aid': IDL.Text, 'content': IDL.Text });
    const QueryArticle = IDL.Record({
        'id': IDL.Text,
        'status': ArticleStatus,
        'thumb': IDL.Text,
        'title': IDL.Text,
        'created': IDL.Int,
        'toped': IDL.Int,
        'subcate': IDL.Nat,
        'atype': ArticleType,
        'cate': IDL.Nat,
        'like': IDL.Nat,
        'tags': IDL.Vec(IDL.Text),
        'view': IDL.Nat64,
        'fromurl': IDL.Text,
        'unlike': IDL.Nat,
        'author': IDL.Principal,
        'commentTotal': IDL.Nat,
        'comment': IDL.Nat,
        'updated': IDL.Int,
        'abstract': IDL.Text,
        'allowComment': IDL.Bool,
        'copyright': IDL.Opt(IDL.Text),
        'original': IDL.Bool,
        'commentNew': IDL.Nat,
    });
    const QueryDetailResp = IDL.Variant({
        'Ok': IDL.Record({ 'content': IDL.Text, 'article': QueryArticle }),
        'Err': IDL.Text,
    });
    const QuerySort = IDL.Variant({
        'TimeAsc': IDL.Null,
        'TimeDesc': IDL.Null,
    });
    const QueryArticleReq = IDL.Record({
        'status': IDL.Opt(ArticleStatus),
        'subcate': IDL.Nat,
        'atype': IDL.Opt(ArticleType),
        'cate': IDL.Nat,
        'page': IDL.Nat,
        'size': IDL.Nat,
        'sort': QuerySort,
        'search': IDL.Text,
    });
    const ArticleStat = IDL.Record({
        'privateCount': IDL.Nat,
        'total': IDL.Nat,
        'draftCount': IDL.Nat,
        'subcribeCount': IDL.Nat,
        'publicCount': IDL.Nat,
    });
    const QueryArticleResp = IDL.Record({
        'total': IDL.Int,
        'hasmore': IDL.Bool,
        'data': IDL.Vec(QueryArticle),
        'page': IDL.Nat,
        'stat': ArticleStat,
    });
    const QueryCommonReq = IDL.Record({
        'page': IDL.Nat,
        'size': IDL.Nat,
        'sort': QuerySort,
    });
    const BlackUser = IDL.Record({ 'pid': IDL.Principal, 'created': IDL.Int });
    const QueryBlackUserResp = IDL.Record({
        'total': IDL.Int,
        'hasmore': IDL.Bool,
        'data': IDL.Vec(BlackUser),
        'page': IDL.Nat,
    });
    const QueryCommentReq = IDL.Record({
        'aid': IDL.Text,
        'pid': IDL.Opt(IDL.Principal),
        'page': IDL.Nat,
        'size': IDL.Nat,
        'sort': QuerySort,
    });
    const CommentStatus = IDL.Variant({
        'Invisible': IDL.Null,
        'Visible': IDL.Null,
    });
    QueryComment.fill(
        IDL.Record({
            'id': IDL.Nat,
            'aid': IDL.Text,
            'pid': IDL.Principal,
            'status': CommentStatus,
            'created': IDL.Int,
            'content': IDL.Text,
            'like': IDL.Nat,
            'reply': IDL.Opt(QueryComment),
        })
    );
    const QueryCommentResp = IDL.Record({
        'total': IDL.Int,
        'hasmore': IDL.Bool,
        'data': IDL.Vec(QueryComment),
        'page': IDL.Nat,
    });
    const SubcribeType = IDL.Variant({
        'Free': IDL.Null,
        'Day180': IDL.Null,
        'Day360': IDL.Null,
        'Day30': IDL.Null,
        'Day90': IDL.Null,
        'Day1000': IDL.Null,
        'Permanent': IDL.Null,
    });
    const QuerySubcriber = IDL.Record({
        'pid': IDL.Principal,
        'created': IDL.Int,
        'subType': SubcribeType,
        'isblack': IDL.Bool,
        'expireTime': IDL.Int,
    });
    const QuerySubcriberResp = IDL.Record({
        'total': IDL.Int,
        'hasmore': IDL.Bool,
        'data': IDL.Vec(QuerySubcriber),
        'page': IDL.Nat,
    });
    const AccountIdentifier = IDL.Vec(IDL.Nat8);
    const Tokens = IDL.Record({ 'e8s': IDL.Nat64 });
    const TransferArgs = IDL.Record({
        'to': IDL.Vec(IDL.Nat8),
        'memo': IDL.Nat64,
        'amount': IDL.Nat64,
    });
    QueryCategory.fill(
        IDL.Record({
            'id': IDL.Nat,
            'name': IDL.Text,
            'children': IDL.Vec(QueryCategory),
        })
    );
    const SubcribePrice = IDL.Record({
        'subType': SubcribeType,
        'price': IDL.Nat,
    });
    const PlanetBase = IDL.Record({
        'url': IDL.Text,
        'subcribers': IDL.Vec(QuerySubcriber),
        'categorys': IDL.Vec(QueryCategory),
        'created': IDL.Int,
        'twitter': IDL.Text,
        'owner': IDL.Principal,
        'desc': IDL.Text,
        'lang': IDL.Text,
        'name': IDL.Text,
        'cover': IDL.Text,
        'subcriber': IDL.Nat,
        'article': IDL.Nat,
        'subprices': IDL.Vec(SubcribePrice),
        'income': IDL.Nat64,
        'canindex': IDL.Bool,
        'canister': IDL.Principal,
        'writers': IDL.Vec(IDL.Principal),
        'avatar': IDL.Text,
    });
    const PermissionType = IDL.Variant({
        'WRITER': IDL.Null,
        'NONE': IDL.Null,
        'OWNER': IDL.Null,
    });
    const PlanetInfo = IDL.Record({
        'url': IDL.Text,
        'memory': IDL.Nat,
        'permission': PermissionType,
        'subcribers': IDL.Vec(QuerySubcriber),
        'categorys': IDL.Vec(QueryCategory),
        'created': IDL.Int,
        'articleStat': ArticleStat,
        'twitter': IDL.Text,
        'owner': IDL.Principal,
        'desc': IDL.Text,
        'lang': IDL.Text,
        'name': IDL.Text,
        'last24subcriber': IDL.Nat,
        'cover': IDL.Text,
        'subcriber': IDL.Nat,
        'article': IDL.Nat,
        'subprices': IDL.Vec(SubcribePrice),
        'income': IDL.Nat64,
        'canindex': IDL.Bool,
        'canister': IDL.Principal,
        'subcriber_new': IDL.Nat,
        'writers': IDL.Vec(IDL.Principal),
        'payee': IDL.Opt(IDL.Vec(IDL.Nat8)),
        'avatar': IDL.Text,
    });
    const QuerySelfSubscriber = IDL.Record({
        'data': IDL.Opt(QuerySubcriber),
        'isblack': IDL.Bool,
    });
    const QueryCommonSubscriber = IDL.Record({
        'data': IDL.Opt(QuerySubcriber),
        'issubscriber': IDL.Bool,
    });
    const PayType = IDL.Variant({ 'Price': SubcribePrice, 'Verify': IDL.Bool });
    const PayInfo = IDL.Record({
        'id': IDL.Nat64,
        'to': IDL.Vec(IDL.Nat8),
        'token': IDL.Text,
        'amount': IDL.Nat64,
        'paytype': PayType,
    });
    const PayResp = IDL.Variant({
        'Ok': IDL.Record({ 'invoice': PayInfo }),
        'Err': IDL.Text,
    });
    const PayStatus = IDL.Variant({
        'Paid': IDL.Null,
        'Unpaid': IDL.Null,
        'Cancel': IDL.Null,
    });
    const QueryOrder = IDL.Record({
        'id': IDL.Nat64,
        'to': IDL.Vec(IDL.Nat8),
        'status': PayStatus,
        'token': IDL.Text,
        'source': IDL.Text,
        'from': IDL.Principal,
        'verifiedTime': IDL.Opt(IDL.Int),
        'sharedTime': IDL.Opt(IDL.Int),
        'amountPaid': IDL.Nat64,
        'amount': IDL.Nat64,
        'paytype': PayType,
    });
    const QueryOrderResp = IDL.Record({
        'total': IDL.Int,
        'hasmore': IDL.Bool,
        'data': IDL.Vec(QueryOrder),
        'page': IDL.Nat,
    });
    return IDL.Service({
        'addArticle': IDL.Func([ArticleArgs], [OpResult], []),
        'addBlackUser': IDL.Func([IDL.Principal], [IDL.Bool], []),
        'addComment': IDL.Func([CommentArgs], [OpResult], []),
        'adminArticle': IDL.Func([IDL.Text], [QueryDetailResp], ['query']),
        'adminArticles': IDL.Func(
            [QueryArticleReq],
            [QueryArticleResp],
            ['query'],
        ),
        'adminBlackUsers': IDL.Func(
            [QueryCommonReq],
            [QueryBlackUserResp],
            ['query'],
        ),
        'adminComments': IDL.Func(
            [QueryCommentReq],
            [QueryCommentResp],
            ['query'],
        ),
        'adminReplyComment': IDL.Func([IDL.Nat, CommentArgs], [OpResult], []),
        'adminShowComment': IDL.Func([IDL.Nat, IDL.Bool], [IDL.Bool], []),
        'adminSubcribers': IDL.Func(
            [QueryCommonReq],
            [QuerySubcriberResp],
            ['query'],
        ),
        'cancelThumbsup': IDL.Func([IDL.Text, IDL.Opt(IDL.Nat)], [OpResult], []),
        'canisterAccount': IDL.Func([], [AccountIdentifier], ['query']),
        'canisterBalance': IDL.Func([], [Tokens], []),
        'canisterMemory': IDL.Func([], [IDL.Nat], ['query']),
        'canisterTransfer': IDL.Func([TransferArgs], [IDL.Bool], []),
        'copyright': IDL.Func([IDL.Text], [IDL.Bool], []),
        'deleteArticle': IDL.Func([IDL.Text], [IDL.Bool], []),
        'getPlanetBase': IDL.Func([], [PlanetBase], ['query']),
        'getPlanetInfo': IDL.Func([], [PlanetInfo], ['query']),
        'getSelfSubcriber': IDL.Func([], [QuerySelfSubscriber], ['query']),
        'isSubscriber': IDL.Func(
            [IDL.Principal],
            [QueryCommonSubscriber],
            ['query'],
        ),
        'preSubscribe': IDL.Func([IDL.Text, SubcribePrice], [PayResp], []),
        'queryArticle': IDL.Func([IDL.Text], [QueryDetailResp], ['query']),
        'queryArticles': IDL.Func(
            [QueryArticleReq],
            [QueryArticleResp],
            ['query'],
        ),
        'queryComments': IDL.Func(
            [QueryCommentReq],
            [QueryCommentResp],
            ['query'],
        ),
        'queryOrders': IDL.Func([QueryCommonReq], [QueryOrderResp], ['query']),
        'removeBlackUser': IDL.Func([IDL.Principal], [IDL.Bool], []),
        'resetArticleCommentNew': IDL.Func([IDL.Text], [IDL.Bool], []),
        'resetSubscriberNew': IDL.Func([], [IDL.Bool], []),
        'setAvatar': IDL.Func([IDL.Text], [IDL.Bool], []),
        'setCanIndex': IDL.Func([IDL.Bool], [IDL.Bool], []),
        'setCategorys': IDL.Func([IDL.Vec(QueryCategory)], [IDL.Bool], []),
        'setCover': IDL.Func([IDL.Text], [IDL.Bool], []),
        'setCustomUrl': IDL.Func([IDL.Text], [IDL.Bool], []),
        'setDesc': IDL.Func([IDL.Text], [IDL.Bool], []),
        'setLang': IDL.Func([IDL.Text], [IDL.Bool], []),
        'setName': IDL.Func([IDL.Text], [IDL.Bool], []),
        'setOwner': IDL.Func([IDL.Principal], [IDL.Bool], []),
        'setSubPrices': IDL.Func([IDL.Vec(SubcribePrice)], [IDL.Bool], []),
        'setTwitter': IDL.Func([IDL.Text], [IDL.Bool], []),
        'setWriters': IDL.Func([IDL.Vec(IDL.Principal)], [IDL.Bool], []),
        'subscribe': IDL.Func([IDL.Nat64], [IDL.Bool], []),
        'thumbsup': IDL.Func([IDL.Text, IDL.Opt(IDL.Nat)], [OpResult], []),
        'topedArticle': IDL.Func([IDL.Text, IDL.Bool], [OpResult], []),
        'transferSubscribe': IDL.Func([IDL.Principal], [IDL.Bool], []),
        'unsubscribe': IDL.Func([], [IDL.Bool], []),
        'updateArticle': IDL.Func([ArticleArgs], [OpResult], []),
        'verifyOwner': IDL.Func([IDL.Opt(IDL.Principal)], [IDL.Bool], ['query']),
        'verifyOwnerWriter': IDL.Func(
            [IDL.Opt(IDL.Principal)],
            [IDL.Bool],
            ['query'],
        ),
        'verifySubcriber': IDL.Func(
            [IDL.Opt(IDL.Principal)],
            [IDL.Bool],
            ['query'],
        ),
        'verifyWriter': IDL.Func([IDL.Opt(IDL.Principal)], [IDL.Bool], ['query']),
        'wallet_balance': IDL.Func([], [IDL.Nat], ['query']),
        'wallet_receive': IDL.Func(
            [],
            [IDL.Record({ 'accepted': IDL.Nat64 })],
            [],
        ),
    });
};
// @ts-ignore 
export const init = ({ IDL }) => { return []; };