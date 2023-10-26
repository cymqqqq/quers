// @ts-ignore 
export const idlFactory = ({ IDL }) => {
    const CreatePlanetSetting = IDL.Record({
        'owner': IDL.Principal,
        'desc': IDL.Text,
        'name': IDL.Text,
        'avatar': IDL.Text,
    });
    const CanisterInfo = IDL.Record({
        'id': IDL.Principal,
        'moduleHash': IDL.Vec(IDL.Nat8),
        'owner': IDL.Principal,
        'initArgs': IDL.Vec(IDL.Nat8),
        'launchTrail': IDL.Principal,
    });
    return IDL.Service({
        'canisterAccount': IDL.Func([], [IDL.Text], ['query']),
        'createPlanet': IDL.Func(
            [CreatePlanetSetting],
            [IDL.Opt(IDL.Principal)],
            [],
        ),
        'queryAgreePayee': IDL.Func([], [IDL.Text], ['query']),
        'queryCanisterIds': IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
        'queryCanisters': IDL.Func([], [IDL.Vec(CanisterInfo)], ['query']),
        'queryWasmHash': IDL.Func([], [IDL.Text], ['query']),
        'setAgreePayee': IDL.Func([IDL.Vec(IDL.Nat8)], [], ['oneway']),
        'setLaunch': IDL.Func([IDL.Principal], [], ['oneway']),
        'setOwner': IDL.Func([IDL.Principal], [], ['oneway']),
        'setUserRouter': IDL.Func([IDL.Principal], [], ['oneway']),
        'setWasm': IDL.Func([IDL.Vec(IDL.Nat8)], [], ['oneway']),
        'upgradePlanet': IDL.Func([IDL.Principal], [IDL.Bool], []),
    });
};
// @ts-ignore 
export const init = ({ IDL }) => { return []; };