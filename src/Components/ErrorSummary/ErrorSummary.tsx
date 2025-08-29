import React, { FC, useRef, useEffect, MouseEvent, ElementRef, useMemo } from 'react'
import { ErrorSummaryProps } from './ErrorSummary.types'

// Prevent default behaviour of error message link click, and instead move focus to target field.
function handleClick (e: MouseEvent<HTMLAnchorElement>): void {
  e.preventDefault()
  const ref = e.currentTarget.href.includes('#') && e.currentTarget.href.split('#').pop()
  const target: HTMLElement | null = document.getElementById(ref as string)

  // / Move focus to the element, if we have found a valid target
  if (target !== null) {
    target.focus()
  }
};

const ErrorSummary: FC<ErrorSummaryProps> = (props: ErrorSummaryProps) => {
  const { heading = 'There is a problem', errorDetails, autoMoveFocus = true } = props

  const errorSummaryRef = useRef<ElementRef<'div'>>(null)

  // One render, move ('take') focus to Error summary component as per GDS suggestions
  useEffect(() => {
    if (errorDetails !== null && errorDetails.length > 0 && errorSummaryRef.current !== null && autoMoveFocus) {
      errorSummaryRef.current.focus()
    }
  }, [errorDetails])

  const errorsList = useMemo(() => {
    if (errorDetails.length > 0) {
      return errorDetails.map((error) => {
        return (
          <li key={error.targetFieldId}>
            <a href={`#${error.targetFieldId}`} onClick={handleClick}>{error.message}</a>
          </li>
        )
      })
    }
  }, [errorDetails])

  return (
    <div ref={errorSummaryRef} className='govuk-error-summary' tabIndex={-1} data-module='govuk-error-summary'>
      <div role='alert'>
        <h2 className='govuk-error-summary__title'>{heading}</h2>
        <div className='govuk-error-summary__body'>
          <ul className='govuk-list govuk-error-summary__list'>
            {errorsList}
          </ul>
        </div>
      </div>
    </div>
  )
}

export { ErrorSummary }
