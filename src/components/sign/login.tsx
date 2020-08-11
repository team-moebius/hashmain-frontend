import React, { useEffect } from 'react'
import { Form, Input, Button, Badge } from 'antd'
import { MailOutlined, LockOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { signInReqAction, signResetAction } from '../../actions/signAction'
import { ReducerState } from '../../reducers/rootReducer'
import { signInFailedFunc } from '../sign/signFuntions'
import { useCustomRouter } from '../../common/router/routerPush'

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

  useEffect(() => {
    if (signInFailed) { signInFailedFunc(dispatch) }
    if (token) { router.push('/') }
  }, [dispatch, signInFailed, token, router])

  return (
    <>
      <Form
        className='loginBox'
        style={{ marginTop: '15px' }}
        onFinish={(value) => {
          dispatch(signInReqAction({ mail: value.email, pwd: value.password }))
          dispatch(signResetAction())
        }}>
        <Form.Item
          label=''
          name='email'
          rules={[{ required: true, message: 'E-Mail을 입력해주세요!' }]}>
          <Input placeholder='E-Mail' prefix={<MailOutlined style={{ marginRight: '5px' }} />} />
        </Form.Item>
        <Form.Item
          label=''
          name='password'
          rules={[{ required: true, message: 'PW를 입력해주세요!' }]}>
          <Input.Password
            placeholder='Password'
            prefix={<LockOutlined style={{ marginRight: '10px' }} />}
          />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit' className='customBtn' style={{ width: '100%' }}>
            로그인
          </Button>
        </Form.Item>
      </Form>
      {renderTextArea()}
    </>
  )
}

export default Login
