import { HTMLAttributes, ChangeEventHandler, InputHTMLAttributes } from 'react'
import { FieldSetProps } from '../FieldSet/index'

export interface DateFieldData extends InputHTMLAttributes<HTMLInputElement> {
  /** Indiciated this field is a specific target of the Date Input error */
  hasError?: boolean
  /** Overrides the label of this field, enabling translation and other customisation */
  label?: string
  /** The value of this specific field */
  value?: string
  /** onChange Event handler for this field */
  handleChange?: ChangeEventHandler<HTMLInputElement>

}

export default interface DateInputProps extends FieldSetProps {
  /** Optional extra props shared by ALL Input fields of the componet */
  inputProps?: HTMLAttributes<HTMLInputElement>
  /** Option autocomplete attribute. Is applied to each field with relevant suffix (e.g. bday is applied as bday-day to the day field) */
  autoComplete?: string

  /** Properties for the 'day' field */
  dayField: DateFieldData
  /** Properties for the 'month' field */
  monthField: DateFieldData
  /** Properties for the 'year' field */
  yearField: DateFieldData

}
