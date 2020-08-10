import { call, put } from 'redux-saga/effects'
import { getDuplicateApi, postSignUpApi, postSignInApi, checkMemberApi } from '../../apis/signApi'
import {
  mailDupSucAction,
  mailDupFailAction,
  signUpSucAction,
  signUpFailAction,
  signInSucAction,
  signInFailAction,
  memberCheckSucAction,
  memberCheckFailAction
} from '../../actions/signAction'

export function* fetchDuplicationCheck(action: any) {
  try {
    const result = yield call(getDuplicateApi, action.payload)
    const isExist = !!result.data
    yield put(mailDupSucAction(isExist))
  } catch (err) {
    const errMsg = err.response ? err.response.data.message : err.message
    yield put(mailDupFailAction(errMsg))
  }
}

export function* fetchSignUp(action: any) {
  try {
    const result = yield call(postSignUpApi, action.payload.mail, action.payload.name, action.payload.pwd)
    yield put(signUpSucAction(result.data === 'OK'))
  } catch (err) {
    const errMsg = err.response ? err.response.data.message : err.message
    yield put(signUpFailAction(errMsg))
  }
}

export function* fetchSignIn(action: any) {
  try {
    // const result = yield call(postSignInApi, 'burette@hanyang.ac.kr', 'highbal1')
    const result = yield call(postSignInApi, action.payload.mail, action.payload.pwd)
    window.localStorage.setItem('token', result.data.token)
    // window.location.reload()
    yield put(signInSucAction())
  } catch (err) {
    const errMsg = err.response ? err.response.data.message : err.message
    yield put(signInFailAction(errMsg))
  }
}

export function* checkMember() {
  try {
    yield call(checkMemberApi)
    yield put(memberCheckSucAction())
  } catch (err) {
    yield put(memberCheckFailAction())
  }
}
