import React, { FC } from 'react'
import { InsetTextProps } from './InsetText.types'

export const InsetText: FC<InsetTextProps> = ({ children }) => {
  return (
    <div className='govuk-inset-text'>
      {children}
    </div>
  )
}
