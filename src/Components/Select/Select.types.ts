import { ChangeEventHandler } from 'react'
import { FormGroupProps } from '../FormGroup'

export interface SelectProps extends FormGroupProps {
  id: string
  selectOptions: SelectOptions[]
  name: string
  errorText?: string
  onChange?: ChangeEventHandler<HTMLSelectElement>
}

export interface SelectOptions {
  value: string
  name: string
  selected?: boolean
}
