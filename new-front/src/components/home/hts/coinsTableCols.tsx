import React, { ReactNode } from 'react'
import numeral from 'numeral'
import { Button } from 'antd'

import { HTS_MONEYTRAY_UNIT_CHANGE, HTS_TRADE_INFO_REQUESTED } from '../../../actionCmds/htsActionCmd'
import { htsMoneytrayChangeActionType, htsInfoActionType } from '../../../actions/htsAction'

interface IColsType {
  title: string | ReactNode,
  dataIndex: string,
  key: string,
  sorter: any,
  render: (value?: any, record?: any, index?: number) => any
}

export function coinsTableCols(monetaryUnit: string, dispatch: any): Array<IColsType> {
  return [{
    title: getTitle('코인명'),
    dataIndex: 'key',
    key: 'key',
    sorter: (a: any, b: any) => a.key.localeCompare(b.key),
    render: (text: string) => (
      <Button
        type='link'
        style={{ color: monetaryUnit === text ? 'rgb(255, 58, 125)' : '#B7C8F5', padding: '5px' }}
        onClick={() => {
          dispatch(htsMoneytrayChangeActionType({ type: HTS_MONEYTRAY_UNIT_CHANGE, monetaryUnit: text }))
          dispatch(htsInfoActionType({ type: HTS_TRADE_INFO_REQUESTED, menuType: 'trade' }))
        }}
      >{text}</Button>
    )
  }, {
    title: getTitle('현재가'),
    dataIndex: 'currentPrice',
    key: 'currentPrice',
    sorter: (a: any, b: any) => a.currentPrice - b.currentPrice,
    render: (text: number) => numeral(text).format(',')
  }, {
    title: getTitle('일간범위'),
    dataIndex: 'changeRate',
    key: 'changeRate',
    sorter: (a: any, b: any) => a.changeRate - b.changeRate,
    render: (text: number) => (
      <p className={text < 0 ? 'lossColor' : 'profitColor'}>{text > 0 && '+'}{numeral(text).format('0.00')}%</p>)
  }, {
    title: getTitle('거래대금'),
    dataIndex: 'accumulatedTradePrice',
    key: 'accumulatedTradePrice',
    sorter: (a: any, b: any) => a.accumulatedTradePrice - b.accumulatedTradePrice,
    render: (text: number) => numeral(text).format('0,0.00a')
  }]
}

function getTitle(title: string): ReactNode {
  return <p style={{ fontSize: '11px', margin: '5px 1px' }}>{title}</p>
}