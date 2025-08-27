import { HTMLAttributes, ReactElement } from 'react'

export interface CheckBoxProps extends HTMLAttributes<HTMLInputElement> {
  id: string
  name: string
  value: string
  label: string
  hintText?: string
  conditionalContent?: ReactElement
  behaviour?: string
}
