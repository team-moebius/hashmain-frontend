import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table } from 'antd'

import { ReducerState } from '../../../reducers/rootReducer'
import { htsTableCols } from './htsTableCols'
import { purchaseRes } from './purchaseRes'

interface ITableProps {
  type: string,
  stdUnit: string,
  monetaryUnit: string,
  tableData: any,
  setTableData: any
}

function renderFooter(type: string, tableData: any) {
  if (type === 'purchase' && tableData && tableData.length > 0) {
    return purchaseRes(type, tableData)
  }
  return <div style={{ height: '0' }} />
}

function refineTableData(tableData: any, isFooter?: boolean) {
  if (tableData && tableData.length > 0) {
    if (isFooter) { return tableData.filter((elm: any) => elm.eventType !== 'DELETE') }
    return tableData
  }
  return []
}

function HtsTable(props: ITableProps) {
  const { type, stdUnit, monetaryUnit, tableData, setTableData } = props
  const dispatch = useDispatch()
  const { assetsData, exchange } = useSelector((state: ReducerState) => ({
    assetsData: state.hts.assetsData,
    exchange: state.hts.exchange
  }))

  return (
    <div style={{ height: type === 'purchase' ? '255px' : '215px' }}>
      <Table
        className='customTable'
        columns={htsTableCols(type, stdUnit, monetaryUnit, tableData, setTableData, dispatch, assetsData, exchange)}
        dataSource={refineTableData(tableData[type])}
        size='small'
        rowClassName={(record: any) => (record.eventType === 'DELETE' ? 'rowDelete' : '')}
        pagination={false}
        scroll={{ y: 200 }}
        footer={() => renderFooter(type, refineTableData(tableData[type], true))}
      />
    </div>
  )
}

export default HtsTable
