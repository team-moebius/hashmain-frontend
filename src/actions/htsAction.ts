import { createAction } from 'typesafe-actions'
import { htsCmds } from '../actionCmds/htsActionCmd'

export const htsInfoReqAction = createAction(htsCmds.HTS_TRADE_INFO_REQUESTED)<string>()
interface IHtsInfoSucType { htsData: {}, manageData?: {}[] }
export const htsInfoSucAction = createAction(htsCmds.HTS_TRADE_INFO_SUCCESS)<IHtsInfoSucType>()
export const htsInfoFailAction = createAction(htsCmds.HTS_TRADE_INFO_FAILED)<string>()

export const htsOrderReqAction = createAction(htsCmds.HTS_TRADE_ORDER_REQUESTED)<Array<Object>>()
interface IHtsOrderSucActionType { htsData: {}, manageData?: {}[] }
export const htsOrderSucAction = createAction(htsCmds.HTS_TRADE_ORDER_SUCCESS)<IHtsOrderSucActionType>()
export const htsOrderFailAction = createAction(htsCmds.HTS_TRADE_ORDER_FAILED)<string>()

interface IHtsAPIKeyActionType { type: string, data?: any }
export const htsAPIKeyReqAction = createAction(htsCmds.HTS_API_KEY_REQUESTED)<IHtsAPIKeyActionType>()
export const htsAPIKeySucAction = createAction(htsCmds.HTS_API_KEY_SUCCESS)<string | Object>()
export const htsAPIKeyFailAction = createAction(htsCmds.HTS_API_KEY_FAILED)<string>()
export const htsAPIKeyResetAction = createAction(htsCmds.HTS_API_KEY_FAILED)()

export const htsAPIKeyStateUpdateAction = createAction(htsCmds.HTS_API_KEY_STATE_CHANGE)<number>()

export const htsMarketReqAction = createAction(htsCmds.HTS_MARKET_INFO_REQUESTED)<string>()
export const htsMarketSucAction = createAction(htsCmds.HTS_MARKET_INFO_SUCCESS)<Array<any>>()
export const htsMarketFailAction = createAction(htsCmds.HTS_MARKET_INFO_FAILED)<string>()

export const htsMoneytrayUpdateAction = createAction(htsCmds.HTS_MONEYTRAY_UNIT_CHANGE)<string>()
export const htsStdUnitUpdateAction = createAction(htsCmds.HTS_STD_UNIT_CHANGE)<string>()

export const htsAssetsReqAction = createAction(htsCmds.HTS_ASSETS_REQUESTED)<string>()
export const htsAssetsSucAction = createAction(htsCmds.HTS_ASSETS_SUCCESS)<any>()
export const htsAssetsFailAction = createAction(htsCmds.HTS_ASSETS_FAILED)<string>()

export const htsExchangeUpdateAction = createAction(htsCmds.HTS_EXCHANGE_UPDATE)<string>()

export const htsManagesReqAction = createAction(htsCmds.HTS_MANAGES_REQUESTED)<string>()
export const htsManagesSucAction = createAction(htsCmds.HTS_MANAGES_SUCCESS)<any>()
export const htsManagesFailAction = createAction(htsCmds.HTS_MANAGES_FAILED)<string>()
