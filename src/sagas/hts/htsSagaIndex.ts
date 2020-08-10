import { takeEvery, all } from 'redux-saga/effects'
import { fetchHtsInfo, fetchHtsOrder, fetchAPIKey, fetchHtsMarketInfo, fetchAssets, fetchManages } from './htsSaga'
import { htsCmds } from '../../actionCmds/htsActionCmd'

function* homeSagas() {
  yield all([
    takeEvery(htsCmds.HTS_TRADE_INFO_REQUESTED, fetchHtsInfo),
    takeEvery(htsCmds.HTS_TRADE_ORDER_REQUESTED, fetchHtsOrder),
    takeEvery(htsCmds.HTS_API_KEY_REQUESTED, fetchAPIKey),
    takeEvery(htsCmds.HTS_MARKET_INFO_REQUESTED, fetchHtsMarketInfo),
    takeEvery(htsCmds.HTS_ASSETS_REQUESTED, fetchAssets),
    takeEvery(htsCmds.HTS_MANAGES_REQUESTED, fetchManages)
  ])
}

export default homeSagas
