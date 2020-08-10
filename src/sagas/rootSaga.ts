import { all } from 'redux-saga/effects'
import signSagas from './sign/signSagaIndex'
import htsSagas from './hts/htsSagaIndex'

function* rootSaga() {
  yield all([
    signSagas(),
    htsSagas()
  ])
}

export default rootSaga
