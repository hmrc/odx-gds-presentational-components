import { ChangeEventHandler } from 'react'
import { FieldSetProps } from '../../FieldSet'
import { RadioButtonProps } from '../RadioButton/RadioButton.types'

export interface DividerOption {
  divider: string
}

export interface RadioButtonOption extends Pick<RadioButtonProps, 'value' | 'label' | 'conditionalContent' | 'hintText' > {}

export interface RadioButtonGroupProps extends FieldSetProps {
  options: Array<RadioButtonOption | DividerOption>
  id: string
  small?: boolean
  inline?: boolean
  value?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
}
