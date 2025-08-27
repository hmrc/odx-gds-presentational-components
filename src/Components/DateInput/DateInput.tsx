import React, { FC } from 'react'
import DateInputProps from '../DateInput/DateInput.types'
import { classBuilder } from '../../Helpers'
import { FormGroup } from '../FormGroup'
import { FieldSet } from '../FieldSet'

const DateInput: FC<DateInputProps> = (props: DateInputProps) => {
  const { name, errorText, dayField, monthField, yearField, inputProps, autoComplete } = props

  const inputClasses = 'govuk-input'

  function widthClass (width: number): string {
    return `govuk-input--width-${width}`
  }

  function generateAutocompleteAttribute (suffix: string): string | undefined {
    if (autoComplete !== undefined && autoComplete !== null && autoComplete.length > 0) {
      return `${autoComplete}-${suffix}`
    } else {
      return undefined
    }
  }

  function errorClass (hasError?: boolean): string | undefined {
    if (errorText !== undefined) {
      if ((hasError) ?? ([dayField, monthField, yearField].filter(field => field.hasError).length === 0)) {
        return 'govuk-input--error'
      }
    }
  }

  return (
    <FieldSet {...props}>
      <div className='govuk-date-input' id={name}>
        <div className='govuk-date-input__item'>
          <FormGroup name={`${name}-day`} label={dayField.label ?? 'Day'} labelIsHeading={false} labelClasses='govuk-date-input__label' id={`${name}-day`}>
            <input
              {...inputProps}
              className={classBuilder([inputClasses, inputProps?.className, widthClass(2), errorClass(dayField.hasError), dayField.className])}
              id={`${name}-day`} name={`${name}-day`} type='text'
              inputMode='numeric' value={dayField.value ?? ''}
              onChange={dayField.handleChange}
              autoComplete={generateAutocompleteAttribute('day')}
            />
          </FormGroup>
        </div>
        <div className='govuk-date-input__item'>
          <FormGroup name={`${name}-month`} label={monthField.label ?? 'Month'} labelIsHeading={false} labelClasses='govuk-date-input__label' id={`${name}-month`}>
            <input
              {...inputProps} className={classBuilder([inputClasses, inputProps?.className, widthClass(2), errorClass(monthField.hasError), dayField.className])}
              id={`${name}-month`} name={`${name}-month`} type='text'
              inputMode='numeric' value={monthField.value ?? ''}
              onChange={monthField.handleChange}
              autoComplete={generateAutocompleteAttribute('month')}
            />
          </FormGroup>
        </div>
        <div className='govuk-date-input__item'>
          <FormGroup name={`${name}-year`} label={yearField.label ?? 'Year'} labelIsHeading={false} labelClasses='govuk-date-input__label' id={`${name}-year`}>
            <input
              {...inputProps} className={classBuilder([inputClasses, inputProps?.className, widthClass(4), errorClass(yearField.hasError), dayField.className])}
              id={`${name}-year`} name={`${name}-year`} type='text'
              inputMode='numeric' value={yearField.value ?? ''}
              onChange={yearField.handleChange}
              autoComplete={generateAutocompleteAttribute('year')}
            />
          </FormGroup>
        </div>
      </div>
    </FieldSet>
  )
}

export { DateInput }
