import React, { ReactNode } from 'react'
import numeral from 'numeral'
import { Button } from 'antd'

import { htsMoneytrayUpdateAction, htsInfoReqAction } from '../../../actions/htsAction'

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
          dispatch(htsMoneytrayUpdateAction(text))
          dispatch(htsInfoReqAction('trade'))
        }}
      >{text}</Button>
    )
  }, {
    title: getTitle('현재가'),
    dataIndex: 'currentPrice',
    key: 'currentPrice',
    sorter: (a: any, b: any) => a.currentPrice - b.currentPrice,
    render: (price: number) => <p style={{ fontSize: '12px' }}>{getPrice(price)}</p>
  }, {
    title: getTitle('일간범위'),
    dataIndex: 'changeRate',
    key: 'changeRate',
    sorter: (a: any, b: any) => a.changeRate - b.changeRate,
    render: (changeRate: number) => (
      <p className={changeRate < 0 ? 'lossColor' : 'profitColor'}>
        {changeRate > 0 && '+'}{numeral(changeRate).format('0.00')}%</p>
    )
  }, {
    title: getTitle('거래대금'),
    dataIndex: 'accumulatedTradePrice',
    key: 'accumulatedTradePrice',
    sorter: (a: any, b: any) => a.accumulatedTradePrice - b.accumulatedTradePrice,
    render: (accumulatedTradePrice: number) => numeral(accumulatedTradePrice).format('0,0.00a')
  }]
}

function getTitle(title: string): ReactNode {
  return <p style={{ fontSize: '11px', margin: '5px 1px' }}>{title}</p>
}

function getPrice(price: number): string {
  if (price >= 100) {
    return numeral(price).format(',')
  }
  return numeral(price).format(',.00')
}
