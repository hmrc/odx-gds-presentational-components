import React, { ChangeEvent, FC, useState, useEffect } from 'react'
import { CheckBox } from '../CheckBox'
import { FieldSet } from '../FieldSet'
import { classBuilder } from '../../Helpers'
import { CheckBoxOption, DividerOption, CheckBoxGroupProps } from './CheckBoxGroup.types'

const CheckBoxGroup: FC<CheckBoxGroupProps> = (props: CheckBoxGroupProps) => {
  const { options, small, id, name, onChange = undefined } = props
  const [value, setValue] = useState(props.value ?? [])

  useEffect(() => {
    setValue(props.value ?? [])
  }, [props.value])

  // If a custom change handler is provided, use that whenever input onChange is called. Otherwise
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (onChange !== undefined) {
      onChange(event)
    }
  }

  const checkBoxGroupClasses = classBuilder(['govuk-checkboxes', small !== undefined && small ? 'govuk-checkboxes--small' : ''])

  return (
    <FieldSet {...props}>
      <div className={checkBoxGroupClasses} data-module='govuk-checkboxes'>
        {options.map((option: CheckBoxOption | DividerOption, index: number) => {
          if ((option as DividerOption).divider !== undefined) {
            option = option as DividerOption
            return (
              <div
                className='govuk-checkboxes__divider'
                key={`${id}-divider-${option.divider}`}
              >
                {option.divider}
              </div>
            )
          } else {
            option = option as CheckBoxOption
            return (
              <CheckBox
                {...option}
                id={`${id}${index > 0 ? `-${index + 1}` : ''}`}
                name={name}
                defaultChecked={value?.includes(option.value)}
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

export { CheckBoxGroup }
