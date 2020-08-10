import produce from 'immer'
import { commonCmds } from '../actionCmds/commonActionCmd'

const initMap = {
  loading: {},
  success: {},
  failed: {},
  menuMode: 'hts'
}

const commonReducer = (state = initMap, action: any) => {
  let nextState = state
  nextState = checkLoading(nextState, action)
  nextState = checkTokenVaild(nextState, action)
  switch (action.type) {
    case commonCmds.HOME_MENU_CHANGE_REQUESTED:
      nextState = produce(state, (draft) => {
        draft.menuMode = action.payload
      })
      break
    default:
      break
  }
  return nextState
}

export default commonReducer

function checkLoading(nextState: any, action: any) {
  if (action.type.indexOf('_REQUESTED') > -1) {
    const key = action.type.replace('_REQUESTED', '')
    nextState = produce(nextState, (draft: any) => {
      draft.loading[key] = true
      draft.success[key] = false
      draft.failed[key] = false
    })
  } else if (action.type.indexOf('_SUCCESS') > -1) {
    const key = action.type.replace('_SUCCESS', '')
    nextState = produce(nextState, (draft: any) => {
      draft.loading[key] = false
      draft.success[key] = true
      draft.failed[key] = false
    })
  } else if (action.type.indexOf('_FAILED') > -1) {
    const key = action.type.replace('_FAILED', '')
    nextState = produce(nextState, (draft: any) => {
      draft.loading[key] = false
      draft.success[key] = false
      draft.failed[key] = action.msg
    })
  } else if (action.type.indexOf('_RESET') > -1) {
    const key = action.type.replace('_RESET', '')
    nextState = produce(nextState, (draft: any) => {
      draft.loading[key] = false
      draft.success[key] = false
      draft.failed[key] = false
    })
  }
  return nextState
}

function checkTokenVaild(nextState: any, action: any) {
  if (action.type.indexOf('_FAILED') > -1) {
    if (action.payload.indexOf('[Auth]') > -1) {
      nextState = produce(nextState, (draft: any) => {
        draft.tokenValid = false
      })
    }
  }
  return nextState
}
