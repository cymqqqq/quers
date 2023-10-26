/* tslint:disable */
// @ts-ignore 
export const idlFacroty =({ IDL }) => {
    const CanisterStatus = IDL.Variant({
        'stopped': IDL.Null,
        'stopping': IDL.Null,
        'running': IDL.Null,
    });
    const DefiniteCAnisterSettings = IDL.Record({
        'freezing_threshold': IDL.Nat,
        'controllers': IDL.Vec(IDL.Principal),
        'memory_allocation': IDL.Nat,
        'compute_allocation': IDL.Nat,
    });
    const CanisterStatusResult = IDL.Record({
        'status': CanisterStatus,
        'memory_size': IDL.Nat,
        'cycles': IDL.Nat,
        'settings': DefiniteCAnisterSettings,
        'idle_cycles_burned_per_day': IDL.Nat,
        'module_hash': IDL.Opt(IDL.Vec(IDL.Nat8)),
    });
    const Page = IDL.Record({ 'page': IDL.Nat32, 'size': IDL.Nat32 });
    const BannedAllArticlesInfo = IDL.Record({
        'created': IDL.Nat64,
        'planet': IDL.Principal,
        'auditor': IDL.Principal,
        'updated': IDL.Nat64,
        'reason': IDL.Text,
    });
    const PageData = IDL.Record({
        'all': IDL.Nat32,
        'data': IDL.Vec(BannedAllArticlesInfo),
        'page': IDL.Nat32,
        'size': IDL.Nat32,
    });
    const BannedArticleInfo = IDL.Record({
        'created': IDL.Nat64,
        'auditor': IDL.Principal,
        'article': IDL.Text,
        'updated': IDL.Nat64,
        'reason': IDL.Text,
    });
    const PageData_1 = IDL.Record({
        'all': IDL.Nat32,
        'data': IDL.Vec(BannedArticleInfo),
        'page': IDL.Nat32,
        'size': IDL.Nat32,
    });
    const MarkLogLevel = IDL.Variant({
        'Error': IDL.Null,
        'Info': IDL.Null,
        'Warn': IDL.Null,
        'Debug': IDL.Null,
        'Trace': IDL.Null,
    });
    const MarkLog = IDL.Record({
        'content': IDL.Text,
        'time': IDL.Nat64,
        'level': MarkLogLevel,
    });
    const PageData_2 = IDL.Record({
        'all': IDL.Nat32,
        'data': IDL.Vec(MarkLog),
        'page': IDL.Nat32,
        'size': IDL.Nat32,
    });
    const MarkPermission = IDL.Variant({
        'NoRecommendedAllArticlesQuery': IDL.Null,
        'MarkPermission': IDL.Null,
        'NoRecommendedArticleInsert': IDL.Null,
        'NoSearchedArticleQuery': IDL.Null,
        'NoAccessedAllArticlesQuery': IDL.Null,
        'MarkLog': IDL.Null,
        'NoAccessedArticleDelete': IDL.Null,
        'NoRecommendedArticleQuery': IDL.Null,
        'NoAccessedArticleQuery': IDL.Null,
        'NoAccessedArticleInsert': IDL.Null,
        'NoSearchedAllArticlesDelete': IDL.Null,
        'NoRecommendedAllArticlesDelete': IDL.Null,
        'NoAccessedAllArticlesDelete': IDL.Null,
        'SelectedArticleDelete': IDL.Null,
        'NoSearchedArticleDelete': IDL.Null,
        'NoSearchedAllArticlesQuery': IDL.Null,
        'NoSearchedAllArticlesInsert': IDL.Null,
        'NoRecommendedAllArticlesInsert': IDL.Null,
        'NoAccessedAllArticlesInsert': IDL.Null,
        'SelectedArticleInsert': IDL.Null,
        'NoSearchedArticleInsert': IDL.Null,
        'SelectedArticleQuery': IDL.Null,
        'NoRecommendedArticleDelete': IDL.Null,
    });
    const WalletReceiveResult = IDL.Record({ 'accepted': IDL.Nat64 });
    return IDL.Service({
        'canister_status': IDL.Func([], [CanisterStatusResult], []),
        'deleteBannedAccessedAllArticles': IDL.Func(
            [IDL.Principal],
            [IDL.Bool],
            [],
        ),
        'deleteBannedAccessedArticle': IDL.Func([IDL.Text], [IDL.Bool], []),
        'deleteBannedRecommendedAllArticles': IDL.Func(
            [IDL.Principal],
            [IDL.Bool],
            [],
        ),
        'deleteBannedRecommendedArticle': IDL.Func([IDL.Text], [IDL.Bool], []),
        'deleteBannedSearchedAllArticles': IDL.Func(
            [IDL.Principal],
            [IDL.Bool],
            [],
        ),
        'deleteBannedSearchedArticle': IDL.Func([IDL.Text], [IDL.Bool], []),
        'deleteSelectedArticle': IDL.Func([IDL.Text], [IDL.Bool], []),
        'findBannedAccessedAllArticlesByPage': IDL.Func(
            [Page],
            [PageData],
            ['query'],
        ),
        'findBannedAccessedArticlesByPage': IDL.Func(
            [Page],
            [PageData_1],
            ['query'],
        ),
        'findBannedRecommendedAllArticlesByPage': IDL.Func(
            [Page],
            [PageData],
            ['query'],
        ),
        'findBannedRecommendedArticlesByPage': IDL.Func(
            [Page],
            [PageData_1],
            ['query'],
        ),
        'findBannedSearchedAllArticlesByPage': IDL.Func(
            [Page],
            [PageData],
            ['query'],
        ),
        'findBannedSearchedArticlesByPage': IDL.Func(
            [Page],
            [PageData_1],
            ['query'],
        ),
        'findSelectedArticlesByPage': IDL.Func([Page], [PageData_1], ['query']),
        'isBannedAccessedAllArticles': IDL.Func(
            [IDL.Principal],
            [IDL.Bool],
            ['query'],
        ),
        'isBannedAccessedArticle': IDL.Func([IDL.Text], [IDL.Bool], ['query']),
        'isBannedRecommendedAllArticles': IDL.Func(
            [IDL.Principal],
            [IDL.Bool],
            ['query'],
        ),
        'isBannedRecommendedArticle': IDL.Func([IDL.Text], [IDL.Bool], ['query']),
        'isBannedSearchedAllArticles': IDL.Func(
            [IDL.Principal],
            [IDL.Bool],
            ['query'],
        ),
        'isBannedSearchedArticle': IDL.Func([IDL.Text], [IDL.Bool], ['query']),
        'isSelectedArticle': IDL.Func([IDL.Text], [IDL.Bool], ['query']),
        'logs_delete': IDL.Func([IDL.Nat32], [IDL.Bool], []),
        'logs_find_by_page': IDL.Func([Page], [PageData_2], ['query']),
        'permission_is_administrator': IDL.Func(
            [IDL.Principal],
            [IDL.Bool],
            ['query'],
        ),
        'permission_is_auditor': IDL.Func([IDL.Principal], [IDL.Bool], ['query']),
        'permission_modify': IDL.Func(
            [IDL.Principal, IDL.Vec(MarkPermission), IDL.Vec(MarkPermission)],
            [],
            [],
        ),
        'permissions_find': IDL.Func(
            [],
            [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Vec(MarkPermission)))],
            ['query'],
        ),
        'permissions_grant_administrator': IDL.Func(
            [IDL.Principal],
            [IDL.Bool],
            [],
        ),
        'permissions_grant_auditor': IDL.Func([IDL.Principal], [IDL.Bool], []),
        'permissions_revoke_administrator': IDL.Func(
            [IDL.Principal],
            [IDL.Bool],
            [],
        ),
        'permissions_revoke_auditor': IDL.Func([IDL.Principal], [IDL.Bool], []),
        'updateOrInsertBannedAccessedAllArticles': IDL.Func(
            [IDL.Principal, IDL.Text],
            [IDL.Bool],
            [],
        ),
        'updateOrInsertBannedAccessedArticle': IDL.Func(
            [IDL.Text, IDL.Text],
            [IDL.Bool],
            [],
        ),
        'updateOrInsertBannedRecommendedAllArticles': IDL.Func(
            [IDL.Principal, IDL.Text],
            [IDL.Bool],
            [],
        ),
        'updateOrInsertBannedRecommendedArticle': IDL.Func(
            [IDL.Text, IDL.Text],
            [IDL.Bool],
            [],
        ),
        'updateOrInsertBannedSearchedAllArticles': IDL.Func(
            [IDL.Principal, IDL.Text],
            [IDL.Bool],
            [],
        ),
        'updateOrInsertBannedSearchedArticle': IDL.Func(
            [IDL.Text, IDL.Text],
            [IDL.Bool],
            [],
        ),
        'updateOrInsertSelectedArticle': IDL.Func(
            [IDL.Text, IDL.Text],
            [IDL.Bool],
            [],
        ),
        'wallet_balance': IDL.Func([], [IDL.Nat], ['query']),
        'wallet_receive': IDL.Func([], [WalletReceiveResult], []),
    });
};
// @ts-ignore 
export const init = ({ IDL }) => { return []; };