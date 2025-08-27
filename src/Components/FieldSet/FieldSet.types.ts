import { ReactElement, ReactNode } from 'react'

export interface FieldSetProps {
  label: string
  legendIsHeading?: boolean
  hintText?: string | ReactNode
  errorText?: string
  children?: ReactNode
  name: string
  legendContent?: ReactElement
  legendClassOverrides?: string
}
