import React, { FC } from 'react'
import { classBuilder } from '../../Helpers'
import { TableProps, tableCellFormat } from './Table.types'

function generateCellFormat (format: tableCellFormat | undefined, cellType: 'cell' | 'head'): string | undefined {
  let cellFormatClasses
  switch (format) {
    case 'numeric':
      if (cellType === 'cell') {
        cellFormatClasses = classBuilder([cellFormatClasses, 'govuk-table__cell--numeric'])
      } else if (cellType === 'head') {
        cellFormatClasses = classBuilder([cellFormatClasses, 'govuk-table__header--numeric'])
      }
      break
    default:
      break
  }
  return cellFormatClasses
}

const Table: FC<TableProps> = (props: TableProps) => {
  const { caption, captionClasses, tableClasses, columns, rows } = props

  return (
    <table className={classBuilder(['govuk-table', tableClasses])}>
      <caption className={classBuilder(['govuk-table__caption', captionClasses])}>{caption}</caption>
      <thead className='govuk-table__head'>
        <tr className='govuk-table__row'>
          {columns.map((column) => {
            return (
              <th key={column.headText} scope='col' className={classBuilder(['govuk-table__header', generateCellFormat(column.format, 'head'), column.classes])}>{column.headText}</th>
            )
          })}
        </tr>
      </thead>
      <tbody className='govuk-table__body'>
        {rows.map((row, index) => {
          return (
            <tr key={index} className='govuk-table__row'>
              {row.map((cell, index) => {
                if (index === 0) {
                  return <th key={cell.content} scope='row' className={classBuilder(['govuk-table__cell', generateCellFormat(columns[index].format, 'head')])}>{cell.content}</th>
                } else {
                  return <td key={cell.content} className={classBuilder(['govuk-table__cell', generateCellFormat(columns[index].format, 'cell')])}>{cell.content}</td>
                }
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export { Table }
