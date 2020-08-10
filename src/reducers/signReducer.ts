import produce from 'immer'
import { signCmds } from '../actionCmds/signActionCmd'

const initMap = {
  mail: '',
  name: '',
  pwd: '',
  pwdChk: '',
  idExist: false,
  signDone: false,
  loginFailed: '',
  tokenValid: true
}

const signReducer = (state = initMap, action: any) => {
  let nextState = state

  switch (action.type) {
    case signCmds.MAIL_VALUE_CHANGE_REQUESTED:
      nextState = produce(state, (draft) => {
        draft.mail = action.payload
      })
      break
    case signCmds.NAME_VALUE_CHANGE_REQUESTED:
      nextState = produce(state, (draft) => {
        draft.name = action.payload
      })
      break
    case signCmds.PWD_VALUE_CHANGE_REQUESTED:
      nextState = produce(state, (draft) => {
        draft.pwd = action.payload
      })
      break
    case signCmds.PWD_CHECK_VALUE_CHANGE_REQUESTED:
      nextState = produce(state, (draft) => {
        draft.pwdChk = action.payload
      })
      break
    case signCmds.MAIL_DUPLICATION_CHECK_SUCCESS:
      nextState = produce(state, (draft) => {
        draft.idExist = action.payload
      })
      break
    case signCmds.SIGN_UP_SUCCESS:
      nextState = produce(state, (draft) => {
        draft.signDone = action.payload
      })
      break
    case signCmds.SIGN_IN_FAILED:
      nextState = produce(state, (draft) => {
        draft.loginFailed = action.payload
      })
      break
    case signCmds.SIGN_REDUCER_RESET:
      nextState = reset(state)
      break
    case signCmds.SIGN_IN_SUCCESS:
      nextState = produce(nextState, (draft: any) => {
        draft.tokenValid = true
      })
      break
    case signCmds.SIGN_MEMBER_CHECK_FAILED:
      nextState = produce(nextState, (draft: any) => {
        draft.tokenValid = false
      })
      break
    case signCmds.SIGN_MEMBER_CHECK_SUCCESS:
      nextState = produce(nextState, (draft: any) => {
        draft.tokenValid = true
      })
      break
    default:
      break
  }
  return nextState
}

export default signReducer

function reset(state: typeof initMap): typeof initMap {
  return produce(state, (draft) => {
    draft.idExist = initMap.idExist
    draft.loginFailed = initMap.loginFailed
    draft.mail = initMap.mail
    draft.name = initMap.name
    draft.pwd = initMap.pwd
    draft.pwdChk = initMap.pwdChk
    draft.signDone = initMap.signDone
  })
}
