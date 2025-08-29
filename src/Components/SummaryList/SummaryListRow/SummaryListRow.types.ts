import { ReactNode, MouseEventHandler } from 'react'

export default interface SummaryListRowProps {
  label: string
  value: ReactNode
  actions?: Array<{ content: ReactNode, handleClick: MouseEventHandler<HTMLAnchorElement>, linkAttributes?: any }>
}
