import { takeEvery, all } from 'redux-saga/effects'
import { signCmds } from '../../actionCmds/signActionCmd'
import { fetchSignUp, fetchDuplicationCheck, fetchSignIn, checkMember } from './signSaga'

function* signSagas() {
  yield all([
    takeEvery(signCmds.MAIL_VALUE_CHANGE_REQUESTED, fetchDuplicationCheck),
    takeEvery(signCmds.SIGN_UP_REQUESTED, fetchSignUp),
    takeEvery(signCmds.SIGN_IN_REQUESTED, fetchSignIn),
    takeEvery(signCmds.SIGN_MEMBER_CHECK_REQUESTED, checkMember)
  ])
}

export default signSagas
