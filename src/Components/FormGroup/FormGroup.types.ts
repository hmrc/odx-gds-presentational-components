import { FunctionComponent, ReactElement, ReactNode } from 'react'

export interface FormGroupProps {
  labelIsHeading?: boolean
  label: string
  errorText?: string
  hintText?: string
  name: string
  id: string
  labelClasses?: string
  errorPrefix?: string
  children?: ReactNode | FunctionComponent
  inputRef?: ReactElement
}
