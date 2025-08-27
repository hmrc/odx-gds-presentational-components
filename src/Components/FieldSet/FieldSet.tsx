// @ts-nocheck
import React, { useState, useEffect, FC } from 'react'
import { FieldSetProps } from './FieldSet.types'
import { ConditionalWrapper } from '../../Helpers/ConditionalWrapper'
import { classBuilder } from '../../Helpers'

export const FieldSet: FC<FieldSetProps> = (props: FieldSetProps) => {
  const { legendIsHeading = true, label, name, errorText, hintText, children, legendContent, legendClassOverrides } = props
  const fieldsetElementAttributes = []
  const [ErrorMessage, setErrorMessage] = useState(errorText)

  useEffect(() => {
    setErrorMessage(errorText)
  }, [errorText])
  const legendClasses = classBuilder(['govuk-fieldset__legend', (legendIsHeading) ? 'govuk-fieldset__legend--l' : null, legendClassOverrides])

  // TODO Reconsider how to generate hintID and errorID for aria-described by
  const describedByIDs: string[] = []
  const hintID = `${name}-hint`
  const errorID = `${name}-error`
  if (hintText !== undefined) { describedByIDs.push(hintID) };
  if (ErrorMessage !== undefined) { describedByIDs.push(errorID) };
  if (describedByIDs.length !== 0) {
    fieldsetElementAttributes['aria-describedby'] = describedByIDs.join(' ')
  }

  const formGroupDivClasses = classBuilder(['govuk-form-group', errorText !== undefined ? 'govuk-form-group--error' : ''])

  return (
    <div className={formGroupDivClasses}>
      <fieldset className='govuk-fieldset' {...fieldsetElementAttributes}>
        <legend className={legendClasses}>
          <ConditionalWrapper
            condition={legendIsHeading}
            wrapper={child => {
              return (
                <>
                  <h1 className='govuk-fieldset__heading'>
                    {child}
                  </h1>
                </>
              )
            }}
            childrenToWrap={label}
          />
          {legendContent}
        </legend>
            {hintText !== undefined && ( 
              <>
                {React.isValidElement(hintText) && hintText}
                {typeof hintText === 'string' && (
                  <div id={hintID} className='govuk-hint'>{hintText}</div>
                )}
              </>
            )}
        {ErrorMessage !== undefined && <p id={errorID} className='govuk-error-message'><span className='govuk-visually-hidden'>Error:</span>{ErrorMessage}</p>}
        {children}
      </fieldset>
    </div>
  )
}
