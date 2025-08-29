import { InputHTMLAttributes, FocusEventHandler } from 'react'
import { FormGroupProps } from '../FormGroup'

export default interface TextInputProps extends FormGroupProps, Omit<InputHTMLAttributes<HTMLInputElement>, 'children'> {
  name: string
  errorText?: string
  hintText?: string
  inputProps?: InputHTMLAttributes<HTMLInputElement>
  classes?: string
  id: string
  onBlur?: FocusEventHandler<HTMLInputElement>
  text?: string
  primary?: boolean
  disabled?: boolean
  suffix?: string
  prefix?: string
}
