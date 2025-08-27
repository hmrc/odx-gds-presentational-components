export type tableCellFormat = 'numeric'

export interface TableColumn {
  headText: string
  classes?: string
  format?: tableCellFormat
}

export interface CellData {
  content: string
  format?: tableCellFormat
}

export interface TableProps {
  caption: string
  captionClasses?: string
  tableClasses?: string
  columns: TableColumn[]
  rows: CellData[][]
}
