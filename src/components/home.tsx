import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { memberCheckReqAction } from 'actions/signAction'
import { ReducerState } from '../reducers/rootReducer'
import HTSSetting from './home/htsSetting'
import Second from './home/second'
import HeaderBar from './wrapper/headerBar'
import LeftMenu from './wrapper/leftMenu'
import FooterBar from './wrapper/footerBar'
import { useCustomRouter } from '../common/router/routerPush'
import { openNotification } from '../common/common'
import '../style/home.css'

function tokenNotValid(router: any, tokenValid: boolean): void {
  const nowToken = window.localStorage.getItem('token')
  if (nowToken && tokenValid) {
    openNotification('error', '토큰이 만료되었습니다.')
  }

  router.push('/sign')
  window.localStorage.clear()
  window.location.reload()
}

function getContents(menuMode: string) {
  switch (menuMode) {
    case 'hts':
      return <HTSSetting />
    default:
      return <Second />
  }
}

function Home() {
  const { menuMode, tokenValid } = useSelector((state: ReducerState) => ({
    menuMode: state.common.menuMode,
    tokenValid: state.sign.tokenValid
  }))
  const nowToken = window.localStorage.getItem('token')
  const router = useCustomRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    if (nowToken && !tokenValid) {
      dispatch(memberCheckReqAction())
    }
  }, [dispatch, nowToken, tokenValid])

  return (
    <>
      {!nowToken || (nowToken && !tokenValid) ? tokenNotValid(router, tokenValid) : (
        <>
          <HeaderBar />
          <div className='contentsBody'>
            <LeftMenu />
            {getContents(menuMode)}
          </div>
          <FooterBar />
        </>
      )}
    </>
  )
}

export default Home
