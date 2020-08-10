import { createAction } from 'typesafe-actions'
import { commonCmds } from '../actionCmds/commonActionCmd'

export const homeMenuAction = createAction(commonCmds.HOME_MENU_CHANGE_REQUESTED)<string>()
