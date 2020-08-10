import React, { useEffect } from 'react'
import { Input, Button, Badge } from 'antd'
import { MailOutlined, LockOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { signInReqAction, signResetAction } from '../../actions/signAction'
import { ReducerState } from '../../reducers/rootReducer'
import { signInFailedFunc } from '../sign/signFuntions'
import { useCustomRouter } from '../../common/router/routerPush'
// import { openNotification } from '../../common/common'

function renderTextArea(): React.ReactElement {
  return (
    <>
      <div style={{ marginTop: '20px', textAlign: 'left', fontSize: '12px' }}>
        <Badge status='default' />
        로그인 후 CRYPYO BOX 의 서비스 이용 시
        <p className='emphasisText'>이용약관</p> 및
        <p className='emphasisText'>개인</p>
        <p className='emphasisText'>정보</p>
        <p className='emphasisText'>정책</p>
        에 동의하는 것으로 간주합니다.
      </div>
      <div style={{ marginTop: '15px', textAlign: 'left', fontSize: '12px' }}>
        <Badge status='default' />
        CRYPTO BOX 는
        <p className='emphasisText'>모든 브라우저에 최적화</p> 되었습니다.
      </div>
    </>
  )
}

function Login() {
  const router = useCustomRouter()
  const dispatch = useDispatch()
  const { signInFailed } = useSelector((state: ReducerState) => ({ signInFailed: state.sign.loginFailed }))
  const token = window.localStorage.getItem('token')
  const inputValue = { mail: '', pwd: '' }

  useEffect(() => {
    if (signInFailed) { signInFailedFunc(dispatch) }
    if (token) { router.push('/') }
  }, [dispatch, signInFailed, token, router])

  return (
    <>
      <Input
        style={{ marginTop: '10px', textAlign: 'left' }}
        placeholder='E-Mail'
        onChange={(e) => { inputValue.mail = e.target.value }}
        prefix={<MailOutlined style={{ marginRight: '5px' }} />}
      />
      <Input.Password
        style={{ marginTop: '10px', textAlign: 'left' }}
        placeholder='Password'
        onChange={(e) => { inputValue.pwd = e.target.value }}
        prefix={<LockOutlined style={{ marginRight: '10px' }} />}
      />
      <Button
        className='customBtn'
        type='primary'
        style={{ marginTop: '15px', width: '100%' }}
        onClick={() => {
          // if (!inputValue.mail || !inputValue.pwd) {
          //   openNotification('error', '입력을 확인해주세요.')
          //   return
          // }
          dispatch(signInReqAction({ mail: inputValue.mail, pwd: inputValue.pwd }))
          dispatch(signResetAction())
        }}>로그인</Button>
      {renderTextArea()}
    </>
  )
}

export default Login
