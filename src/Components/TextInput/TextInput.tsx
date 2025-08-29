import React, { FC, ReactElement } from 'react'
import { classBuilder } from '../../Helpers'
import TextInputProps from './TextInput.types'
import { FormGroup } from '../FormGroup'
import { ConditionalWrapper } from '../../Helpers/ConditionalWrapper'

const TextInput: FC<TextInputProps> = (props: TextInputProps) => {
  const { errorText, id, name, onBlur, suffix, prefix, inputProps } = props

  const hasError = (errorText !== undefined && errorText !== '')

  const inputClasses = classBuilder(['govuk-input', `${hasError ? 'govuk-input--error' : ''}`, inputProps?.className])

  // TODO - Handle input types (password, email, numeric) - Or investigate if these should be separate components, or can simple be handled by inputProps

  return (
    <FormGroup {...props}>
      {(formGroupInputAttribs) => {
        return (
          <ConditionalWrapper
            condition={suffix !== undefined || prefix !== undefined}
            wrapper={(child: ReactElement) => {
              return (
                <div className='govuk-input__wrapper'>
                  {prefix !== undefined &&
                    <div className='govuk-input__prefix' aria-hidden='true'>{prefix}</div>}
                  {child}
                  {suffix !== undefined &&
                    <div className='govuk-input__suffix' aria-hidden='true'>{suffix}</div>}
                </div>
              )
            }}
            childrenToWrap={
              <input
                {...inputProps}
                {...formGroupInputAttribs}
                id={id}
                name={name}
                onBlur={onBlur}
                className={inputClasses}
              />
            }
          />
        )
      }}
    </FormGroup>
  )
}

export { TextInput }
