import { HTMLAttributes, ReactElement } from 'react'

export interface RadioButtonProps extends HTMLAttributes<HTMLInputElement> {
  id: string
  name: string
  value: string
  label: string
  hintText?: string
  conditionalContent?: ReactElement
}
