import React, { useState } from 'react'
import { Row, Col, Menu } from 'antd'
import { KeyOutlined, UserAddOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { ReducerState } from '../../reducers/rootReducer'
import ResultView from './resultView'
import Login from './login'
import Join from './join'
import '../../style/sign.css'

function Sign() {
  const [viewMode, setViewMode] = useState('login')
  const { signDone } = useSelector((state: ReducerState) => ({ signDone: state.sign.signDone }))
  return (
    <Row justify='space-around' align='middle' style={{ height: '100vh' }}>
      <Col span={10}>
        <div className='signPageBox'>
          {signDone ? <ResultView /> : (
            <>
              <Menu
                onClick={(e: any) => setViewMode(e.key)}
                selectedKeys={[viewMode]}
                mode='horizontal'
                style={{ textAlign: 'center', width: '100%' }}>
                <Menu.Item key='login' style={{ width: '180px', margin: '0' }}>
                  <KeyOutlined />로그인
                </Menu.Item>
                <Menu.Item key='join' style={{ width: '180px', margin: '0' }}>
                  <UserAddOutlined />회원가입
                </Menu.Item>
              </Menu>
              {viewMode === 'login' ? <Login /> : <Join />}
            </>
          )}
        </div>
      </Col>
    </Row>
  )
}

export default Sign
