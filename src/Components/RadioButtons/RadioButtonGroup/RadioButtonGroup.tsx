import React, { ChangeEvent, FC, useState } from 'react'
import { RadioButton } from '../RadioButton'
import { FieldSet } from '../../FieldSet'
import { classBuilder } from '../../../Helpers'
import { RadioButtonOption, DividerOption, RadioButtonGroupProps } from './RadioButtonGroup.types'

const RadioButtonGroup: FC<RadioButtonGroupProps> = (props: RadioButtonGroupProps) => {
  const { options, small, inline, id, onChange = undefined } = props
  const [value, setValue] = useState(props.value)

  // Default change handler for basic controlled inputs, for basic implementations
  const defaultHandleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value)
  }

  // If a custom change handler is provided, use that whenever input onChange is called. Otherwise
  // use the defaultHandler to ensure basic radio button functionality
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (onChange !== undefined) {
      onChange(event)
    } else {
      defaultHandleChange(event)
    }
  }

  const radioGroupClasses = classBuilder(['govuk-radios', small !== undefined && small ? 'govuk-radios--small' : '', inline !== undefined && inline ? 'govuk-radios--inline' : ''])

  return (
    <FieldSet {...props}>
      <div className={radioGroupClasses} data-module='govuk-radios'>
        {options.map((option: RadioButtonOption | DividerOption, index: number) => {
          if ((option as DividerOption).divider !== undefined) {
            option = option as DividerOption
            return (
              <div
                className='govuk-radios__divider'
                key={`${id}-divider-${option.divider}`}
              >
                {option.divider}
              </div>
            )
          } else {
            option = option as RadioButtonOption
            return (
              <RadioButton
                {...option}
                id={`${id}${index > 0 ? `-${index + 1}` : ''}`}
                name={id}
                defaultChecked={option.value === value}
                onChange={handleChange}
                key={`${id}-item-${option.value}`}
                value={option.value}
                label={option.label}
              />
            )
          }
        })}
      </div>
    </FieldSet>
  )
}

export { RadioButtonGroup }
