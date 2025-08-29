import React, { FC } from 'react'
import { WarningTextProps } from './WarningText.types'

export const WarningText: FC<WarningTextProps> = (props: WarningTextProps) => {
  const { iconFallbackText, text } = props

  return (
    <div className='govuk-warning-text'>
      <span className='govuk-warning-text__icon' aria-hidden='true'>!</span>
      <strong className='govuk-warning-text__text'>
        <span className='govuk-visually-hidden'>{iconFallbackText}</span>
        {text}
      </strong>
    </div>
  )
}
