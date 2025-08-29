import { ChangeEventHandler } from 'react'
import { FieldSetProps } from '../FieldSet'
import { CheckBoxProps } from '../CheckBox/CheckBox.types'

export interface DividerOption {
  divider: string
}

export interface CheckBoxOption extends Pick<CheckBoxProps, 'value' | 'label' | 'conditionalContent' | 'hintText' | 'behaviour' > {}

export interface CheckBoxGroupProps extends FieldSetProps {
  options: Array<CheckBoxOption | DividerOption>
  id: string
  small?: boolean
  value?: string[]
  hintText?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
}
