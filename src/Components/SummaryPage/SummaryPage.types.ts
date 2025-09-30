import { ReactNode } from 'react'

export default interface SummaryPageProps {
  bannerTitle?: string
  title?: string
  children: ReactNode
  bannerClassName?: string
}
