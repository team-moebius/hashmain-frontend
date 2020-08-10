import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ApiKeyRegister from './apiKeyRegister'
import CoinsTable from './coinsTable'
import { ReducerState } from '../../../reducers/rootReducer'
import { openNotification } from '../../../common/common'
import { htsAPIKeyStateUpdateAction } from '../../../actions/htsAction'

function RightSection() {
  const [isRegister, setIsRegister] = useState(false)
  const dispatch = useDispatch()
  const { apiKeyState } = useSelector((state: ReducerState) => ({
    apiKeyState: state.hts.apiKeyState
  }))

  useEffect(() => {
    if (apiKeyState !== 0) {
      if (apiKeyState === 1) { openNotification('success', '해당 요청은 유효합니다.') }
      if (apiKeyState === -1) { openNotification('error', '해당 요청은 유효하지 않습니다.') }
      dispatch(htsAPIKeyStateUpdateAction(0))
    }
  }, [dispatch, apiKeyState])

  return (
    <div className='rightSecion'>
      <ApiKeyRegister isRegister={isRegister} setIsRegister={setIsRegister} />
      <CoinsTable isRegister={isRegister} /* setIsRegister={setIsRegister} *//>
    </div>
  )
}

export default RightSection
