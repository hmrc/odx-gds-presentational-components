import React, { FC } from 'react'
import { SelectProps } from './Select.types'
import { FormGroup } from '../FormGroup'
import { classBuilder } from '../../Helpers'

const Select: FC<SelectProps> = (props: SelectProps) => {
  const { id, name, selectOptions, errorText, onChange } = props

  const preselectedValue = selectOptions.find(option => option.selected)

  const hasError = (errorText !== undefined && errorText !== '')

  const selectClasses = classBuilder(['govuk-select', `${hasError ? 'govuk-select--error' : ''}`])

  return (
    <>
      <FormGroup {...props}>
        {(formGroupInputAttribs) => (
          <select
            {...formGroupInputAttribs}
            className={selectClasses}
            id={id}
            name={name}
            onChange={onChange}
            value={preselectedValue?.value}
          >
            {selectOptions.map((selectOption) => (
              <option
                key={selectOption.name}
                value={selectOption.value}
              >
                {selectOption.name}
              </option>
            ))}
          </select>
        )}
      </FormGroup>
    </>
  )
}

export { Select }
