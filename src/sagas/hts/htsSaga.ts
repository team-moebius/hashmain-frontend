import { put, call, select } from 'redux-saga/effects'
import {
  getOrderForStockApi, fetchOrderForStockApi, fetchAPIKeyAPi, getMarketApi, getAssetsApi, getManagesApi
} from '../../apis/htsApi'
import { ReducerState } from '../../reducers/rootReducer'
import {
  htsInfoSucAction,
  htsInfoFailAction,
  htsMarketSucAction,
  htsMarketFailAction,
  htsOrderSucAction,
  htsOrderFailAction,
  htsAPIKeySucAction,
  htsAPIKeyFailAction,
  htsAssetsSucAction,
  htsAssetsFailAction,
  htsManagesSucAction,
  htsManagesFailAction
} from '../../actions/htsAction'

/*
  After asset Api develop, It must be modify function 'refineHTSData', 'refineManageData'
  It have to delete asset part
*/

export function* fetchHtsInfo() {
  try {
    const token = window.localStorage.getItem('token') || 'empty'
    const { monetaryUnit, stdUnit, exchange } = yield select((state: ReducerState) => ({
      monetaryUnit: state.hts.monetaryUnit,
      stdUnit: state.hts.stdUnit,
      exchange: state.hts.exchange
    }))
    const result = yield call(getOrderForStockApi, exchange, token, monetaryUnit, stdUnit)
    const hts = refineHTSData(result.data)
    const manage = refineManageData(hts)
    yield put(htsInfoSucAction({ htsData: hts, manageData: manage }))
  } catch (err) {
    const errMsg = err.response ? err.response.data.message : err.message
    yield put(htsInfoFailAction(errMsg))
  }
}

export function* fetchHtsMarketInfo(action: any) {
  try {
    const token = window.localStorage.getItem('token') || 'empty'
    const result = yield call(getMarketApi, action.payload, token)
    const marketDataResult = result.data.map(
      (elm: any) => ({ ...elm, key: elm.symbol.slice(elm.symbol.indexOf('-') + 1) })
    )

    yield put(htsMarketSucAction(marketDataResult))
  } catch (err) {
    const errMsg = err.response ? err.response.data.message : err.message
    yield put(htsMarketFailAction(errMsg))
  }
}

export function* fetchHtsOrder(action: any) {
  try {
    const token = window.localStorage.getItem('token') || 'empty'
    const result = yield call(fetchOrderForStockApi, action.payload, token)
    const hts = refineHTSData(result.data)
    const manage = refineManageData(hts)
    yield put(htsOrderSucAction({ htsData: hts, manageData: manage }))
  } catch (err) {
    const errMsg = err.response ? err.response.data.message : err.message
    yield put(htsOrderFailAction(errMsg))
  }
}

export function* fetchAPIKey(action: any) {
  try {
    const token = window.localStorage.getItem('token') || 'empty'
    const result = yield call(fetchAPIKeyAPi, { ...action.payload }, token)
    yield put(htsAPIKeySucAction(result.data))
  } catch (err) {
    const errMsg = err.response ? err.response.data.message : err.message
    yield put(htsAPIKeyFailAction(errMsg))
  }
}

export function* fetchAssets(action: any) {
  try {
    const token = window.localStorage.getItem('token') || 'empty'
    const result = yield call(getAssetsApi, action.payload, token)
    yield put(htsAssetsSucAction(result.data.assets))
  } catch (err) {
    const errMsg = err.response ? err.response.data.message : err.message
    yield put(htsAssetsFailAction(errMsg))
  }
}

export function* fetchManages(action: any) {
  try {
    const token = window.localStorage.getItem('token') || 'empty'
    const result = yield call(getManagesApi, action.payload, token)
    yield put(htsManagesSucAction(result.data.orderStatuses))
  } catch (err) {
    const errMsg = err.response ? err.response.data.message : err.message
    yield put(htsManagesFailAction(errMsg))
  }
}

function refineHTSData(data: { assets: Array<any>, orders: Array<any> }) {
  const title = { SALE: '차 이익실현 지정', PURCHASE: '차 지정', STOPLOSS: '차 감시 지정' }
  const orderType = { LIMIT: '가', MARKET: ' 시장가' }
  const customFilter = (orderPosition: string) => data.orders.filter((elm) => elm.orderPosition === orderPosition)
    .sort((a: {level: number}, b: {level: number}) => (
      orderPosition === 'SALE' ? a.level - b.level : a.level - b.level
    ))
    .map((elm, idx) => ({
      ...elm,
      key: elm.id + idx,
      title: `${title[orderPosition]}${orderType[elm.orderType]}${orderPosition === 'PURCHASE' ? ' 매수' : ' 매도'}`
    }))

  return {
    assets: data.assets,
    sale: customFilter('SALE'),
    purchase: customFilter('PURCHASE'),
    stopLoss: customFilter('STOPLOSS')
  }
}

function refineManageData(data: { assets: any[], sale: any[], purchase: any[], stopLoss: any[] }) {
  const res: { ownCoin: string; average: number; totalVol: any; assessment: number; profit: number }[] = []
  if (!data.assets) { return [] }
  data.assets.forEach((walElm: any) => {
    const walData = data.purchase.filter((elm: any) => elm.symbol.indexOf(walElm.currency) === 0)
    const volume = walData.reduce((a: any, b: { volume: any }) => (a + b.volume), 0)
    const avg = walData.reduce((a: any, b: any) => (a + b.price * b.volume), 0) / volume
    const assessmentMoney = volume * 100 // 100은 현재 시세, 아직 데이터가 없음
    res.push({
      ownCoin: `${walElm.currency}. ${walElm.balance}`,
      average: avg,
      totalVol: volume,
      assessment: assessmentMoney,
      profit: (assessmentMoney / (avg * volume)) * 100
    })
  })

  return res
}
