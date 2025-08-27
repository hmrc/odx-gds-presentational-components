import React from 'react'
import { cleanup, render } from '@testing-library/react'
import { snapshotAndAxeTest } from '../../../testHelpers'
import { TableColumn, CellData } from '../Table.types'
import { Table } from '../Table'
import '@testing-library/jest-dom'

/****************
 * SET UP
 ****************/
// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

const testCaption = 'Table Caption'
const testCaptionClass = 'govuk-table__caption--m'
const testTableClasses = 'govuk-table--small-text-until-tablet'
const testColumns: TableColumn[] = [
  { headText: 'Column 1' },
  { headText: 'Column 2', classes: 'extra-class' },
  { headText: 'Numeric column', format: 'numeric' }
]
const testRows: CellData[][] = [
  [{ content: 'c1,r1' }, { content: 'c2,r1' }, { content: 'c3,r1', format: 'numeric' }],
  [{ content: 'c1,r2' }, { content: 'c2,r2' }, { content: 'c3,r1', format: 'numeric' }]
]

const testDefaultTableProps = {
  caption: testCaption,
  columns: testColumns,
  rows: testRows
}
/****************
 * SNAPHOTS
 ****************/

snapshotAndAxeTest('Default Table', <Table caption={testCaption} columns={[{ headText: 'Abc' }, { headText: 'Def' }]} rows={[[{ content: 'c1,r1' }, { content: 'c2,r1' }], [{ content: 'c1,r2' }, { content: 'c2,r2' }]]} />)
snapshotAndAxeTest('Table with numeric formatted cells', <Table caption={testCaption} columns={testColumns} rows={testRows} />)
snapshotAndAxeTest('Table with table class overrides', <Table caption={testCaption} columns={testColumns} rows={testRows} tableClasses={testTableClasses} />)

/****************
 * ASSERTIONS
 ****************/

describe('Given I am using a GDS Table', () => {
  describe('When provided with table classes', () => {
    it('Should apply to the table element class attribute', () => {
      const tableElement = render(<Table {...testDefaultTableProps} tableClasses={testTableClasses} />).getByRole('table')
      expect(tableElement.classList).toContain(testTableClasses)
    })
  })

  describe('When provided with caption text', () => {
    it('Should render the table caption contiaining the provided text', () => {
      const tableElement = render(<Table {...testDefaultTableProps} />).getByRole('table')
      const caption = tableElement.getElementsByTagName('caption')
      expect(caption.length).toBe(1)
      expect(caption.item(0)?.textContent).toBe(testCaption)
    })

    describe('When providing a caption class', () => {
      it('Should be applied to the caption element class attribute', () => {
        const tableElement = render(<Table {...testDefaultTableProps} captionClasses={testCaptionClass} />).getByRole('table')
        const caption = tableElement.getElementsByTagName('caption')
        expect(caption.item(0)?.classList).toContain(testCaptionClass)
      })
    })
  })

  describe('When provided with Column headers', () => {
    it('Should render provided column headers in the table head', () => {
      const tableElement = render(<Table {...testDefaultTableProps} />).getByRole('table')
      const tableHeadElement = tableElement.getElementsByTagName('thead').item(0)
      const tableHeadings = tableHeadElement?.getElementsByTagName('th')
      expect(tableHeadings?.length).toBe(testColumns.length)

      for (let headingIndex = 0; headingIndex < (tableHeadings?.length ?? 0); headingIndex++) {
        expect(tableHeadings?.item(headingIndex)?.textContent).toBe(testColumns[headingIndex].headText)
      }
    })

    it('Should apply relevant format classes to table headings, if providied', () => {
      const tableElement = render(<Table {...testDefaultTableProps} />).getByRole('table')
      const tableHeadElement = tableElement.getElementsByTagName('thead').item(0)
      const tableHeadings = tableHeadElement?.getElementsByTagName('th')
      for (let headingIndex = 0; headingIndex < (tableHeadings?.length ?? 0); headingIndex++) {
        if (testColumns[headingIndex].format === 'numeric') {
          expect(tableHeadings?.item(headingIndex)?.classList).toContain('govuk-table__header--numeric')
        } else {
          expect(tableHeadings?.item(headingIndex)?.classList).not.toContain('govuk-table__header--numeric')
        }
      }
    })

    it('Should apply relevant extra class to table headings, if providied', () => {
      const tableElement = render(<Table {...testDefaultTableProps} />).getByRole('table')
      const tableHeadElement = tableElement.getElementsByTagName('thead').item(0)
      const tableHeadings = tableHeadElement?.getElementsByTagName('th')
      for (let headingIndex = 0; headingIndex < (tableHeadings?.length ?? 0); headingIndex++) {
        if (testColumns[headingIndex].classes !== undefined) {
          expect(tableHeadings?.item(headingIndex)?.classList).toContain(testColumns[headingIndex].classes)
        }
      }
    })
  })

  describe('When provided with Row data', () => {
    it('Should render the number of provided rows in the table body', () => {
      const tableElement = render(<Table {...testDefaultTableProps} />).getByRole('table')
      const tableBody = tableElement.getElementsByTagName('TBODY').item(0)

      expect(tableBody?.getElementsByTagName('TR').length).toBe(testRows.length)
    })

    it('Should render provided cells data within each row', () => {
      const tableElement = render(<Table {...testDefaultTableProps} />).getByRole('table')
      const tableBody = tableElement.getElementsByTagName('TBODY').item(0)
      const tableRows = tableBody?.getElementsByTagName('TR')

      for (let rowIndex = 0; rowIndex < (tableRows?.length ?? 0); rowIndex++) {
        const rowCells = tableRows?.item(rowIndex)?.children
        expect(rowCells?.length).toBe(testRows[rowIndex].length)
        for (let cellIndex = 0; cellIndex < (tableRows?.length ?? 0); cellIndex++) {
          expect(rowCells?.item(cellIndex)?.textContent).toBe(testRows[rowIndex][cellIndex].content)
        }
      }
    })

    it('Should apply relevant classes for given cell format, if a format is provided', () => {
      const tableElement = render(<Table {...testDefaultTableProps} />).getByRole('table')
      const tableBody = tableElement.getElementsByTagName('TBODY').item(0)
      const tableRows = tableBody?.getElementsByTagName('TR')

      for (let rowIndex = 0; rowIndex < (tableRows?.length ?? 0); rowIndex++) {
        const rowCells = tableRows?.item(rowIndex)?.children
        expect(rowCells?.length).toBe(testRows[rowIndex].length)
        for (let cellIndex = 0; cellIndex < (tableRows?.length ?? 0); cellIndex++) {
          if (testRows[rowIndex][cellIndex].format === 'numeric') {
            if (cellIndex === 0) {
              expect(rowCells?.item(cellIndex)?.textContent).toContain('govuk-table__header--numeric')
            } else {
              expect(rowCells?.item(cellIndex)?.classList).toContain('govuk-table__cell--numeric')
            }
          }
        }
      }
    })
  })
})
