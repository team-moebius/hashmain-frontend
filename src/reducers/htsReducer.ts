import produce from 'immer'
import { htsCmds } from '../actionCmds/htsActionCmd'

const initMap = {
  menuMode: 'hts',
  htsData: {},
  manageData: [{ key: 'empty' }],
  registerValue: {},
  isValid: false,
  apiKeyState: 0, // -1: fail, 0: none, 1: success
  marketData: [{}],
  monetaryUnit: 'BTC',
  stdUnit: 'KRW',
  assetsData: [],
  exchange: 'upbit'
}

const homeReducer = (state = initMap, action: any) => {
  let nextState = state

  switch (action.type) {
    case htsCmds.HTS_TRADE_INFO_SUCCESS:
      nextState = produce(state, (draft) => {
        draft.htsData = action.payload
      })
      break
    case htsCmds.HTS_API_KEY_REQUESTED:
      nextState = produce(state, (draft) => {
        draft.registerValue = action.payload.data
      })
      break
    case htsCmds.HTS_API_KEY_RESET:
      nextState = produce(state, (draft) => {
        draft.registerValue = {}
        draft.isValid = false
        draft.apiKeyState = 0
      })
      break
    case htsCmds.HTS_API_KEY_SUCCESS:
      nextState = produce(state, (draft) => {
        draft.isValid = true
        draft.apiKeyState = 1
      })
      break
    case htsCmds.HTS_API_KEY_FAILED:
      nextState = produce(state, (draft) => {
        draft.apiKeyState = -1
      })
      break
    case htsCmds.HTS_API_KEY_STATE_CHANGE:
      nextState = produce(state, (draft) => {
        draft.apiKeyState = action.payload
      })
      break
    case htsCmds.HTS_MARKET_INFO_SUCCESS:
      nextState = produce(state, (draft) => {
        draft.marketData = action.payload
      })
      break
    case htsCmds.HTS_MONEYTRAY_UNIT_CHANGE:
      nextState = produce(state, (draft) => {
        draft.monetaryUnit = action.payload
      })
      break
    case htsCmds.HTS_STD_UNIT_CHANGE:
      nextState = produce(state, (draft) => {
        draft.stdUnit = action.payload
      })
      break
    case htsCmds.HTS_ASSETS_SUCCESS:
      nextState = produce(state, (draft) => {
        draft.assetsData = action.payload
      })
      break
    case htsCmds.HTS_EXCHANGE_UPDATE:
      nextState = produce(state, (draft) => {
        draft.exchange = action.payload
      })
      break
    case htsCmds.HTS_MANAGES_SUCCESS:
      nextState = produce(state, (draft) => {
        draft.manageData = action.payload
      })
      break
    default:
      break
  }
  return nextState
}

export default homeReducer
