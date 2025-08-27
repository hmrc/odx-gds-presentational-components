import React, { ReactNode, FC } from 'react'
import { ConditionalWrapper } from '../../Helpers/ConditionalWrapper'
import { classBuilder } from '../../Helpers'
import { FormGroupProps } from './FormGroup.types'

function makeHintId (identifier: string): string {
  return `${identifier}-hint`
}
function makeErrorId (identifier: string): string {
  return `${identifier}-error`
}

const FormGroup: FC<FormGroupProps> = (props: FormGroupProps) => {
  const {
    labelIsHeading = true,
    label,
    errorText,
    hintText,
    name,
    id,
    labelClasses = '',
    children,
    errorPrefix = 'Error'
  } = props

  const hasError = (errorText !== undefined && errorText !== '')
  const hasHintText = (hintText !== undefined && hintText !== '')

  const formGroupDivClasses = classBuilder(['govuk-form-group', `${hasError ? 'govuk-form-group--error' : ''}`])
  const allLabelClasses = classBuilder(['govuk-label', `${labelIsHeading ? 'govuk-label--l' : ''} ${labelClasses}`])

  function ariaDescribedbyIdBuilder (name: string, hasHintText: boolean, hasError: boolean): string | undefined {
    if (hasHintText || hasError) {
      return `${hasHintText ? makeHintId(name) : ''} ${hasError ? makeErrorId(name) : ''}`.trim()
    } else {
      return undefined
    }
  }

  return (
    <div className={formGroupDivClasses}>
      <ConditionalWrapper
        condition={labelIsHeading}
        wrapper={(child: ReactNode) => {
          return <h1 className='govuk-label-wrapper'>{child}</h1>
        }}
        childrenToWrap={
          <label className={allLabelClasses} htmlFor={id}>
            {label}
          </label>
        }
      />
      {hasHintText && (
        <div id={makeHintId(name)} className='govuk-hint'>
          {hintText}
        </div>
      )}
      {hasError && (
        <p id={makeErrorId(name)} className='govuk-error-message'>
          <span className='govuk-visually-hidden'>{`${errorPrefix}:`}</span>
          {errorText}
        </p>
      )}
      {
        (() => {
          if (children !== undefined && children !== null) {
            if (typeof children === 'function') {
              return children({ id, name, 'aria-describedby': ariaDescribedbyIdBuilder(name, hasHintText, hasError) })
            }
          }
          if (React.isValidElement(children)) {
            return React.cloneElement(children as any, { id, name, 'aria-describedby': ariaDescribedbyIdBuilder(name, hasHintText, hasError) })
          }
          return children
        })()
      }
    </div>
  )
}

export { FormGroup, makeErrorId, makeHintId }
