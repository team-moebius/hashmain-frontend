import { combineReducers } from 'redux'
import commonReducer from './commonReducer'
import signReducer from './signReducer'
import htsReducer from './htsReducer'

const rootReducer = combineReducers({
  common: commonReducer,
  sign: signReducer,
  hts: htsReducer
})

export type ReducerState = ReturnType<typeof rootReducer>

export default rootReducer
