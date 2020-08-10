import { createAction } from 'typesafe-actions'
import { signCmds } from '../actionCmds/signActionCmd'

export const mailAction = createAction(signCmds.MAIL_VALUE_CHANGE_REQUESTED)<string>()
export const nameAction = createAction(signCmds.NAME_VALUE_CHANGE_REQUESTED)<string>()
export const pwdAction = createAction(signCmds.PWD_VALUE_CHANGE_REQUESTED)<string>()
export const pwdChkAction = createAction(signCmds.PWD_CHECK_VALUE_CHANGE_REQUESTED)<string>()

interface ISignUpActionType { mail: string, name: string, pwd: string }
export const signUpReqAction = createAction(signCmds.SIGN_UP_SUCCESS)<ISignUpActionType>()
export const signUpSucAction = createAction(signCmds.SIGN_UP_SUCCESS)<boolean>()
export const signUpFailAction = createAction(signCmds.SIGN_UP_FAILED)<string>()
export const signUpResetAction = createAction(signCmds.SIGN_UP_RESET)()

export const mailDupSucAction = createAction(signCmds.MAIL_DUPLICATION_CHECK_SUCCESS)<boolean>()
export const mailDupFailAction = createAction(signCmds.MAIL_DUPLICATION_CHECK_FAILED)<string>()

interface ISignInActionType { mail: string, pwd: string }
export const signInReqAction = createAction(signCmds.SIGN_IN_REQUESTED)<ISignInActionType>()
export const signInSucAction = createAction(signCmds.SIGN_IN_SUCCESS)()
export const signInFailAction = createAction(signCmds.SIGN_IN_FAILED)<string>()
export const signResetAction = createAction(signCmds.SIGN_REDUCER_RESET)()

export const memberCheckReqAction = createAction(signCmds.SIGN_MEMBER_CHECK_REQUESTED)()
export const memberCheckSucAction = createAction(signCmds.SIGN_MEMBER_CHECK_SUCCESS)()
export const memberCheckFailAction = createAction(signCmds.SIGN_MEMBER_CHECK_FAILED)()
