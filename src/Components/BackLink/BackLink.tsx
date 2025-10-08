import React, { FC } from 'react'
import { BackLinkProps, ValidatedBackLinkProps } from './BackLink.types'

export const BackLink: FC<BackLinkProps> = (props) => {
  const validated = new ValidatedBackLinkProps(props)
  const backLinkClass = `govuk-back-link${validated.inverse ? ' govuk-back-link--inverse' : ''}`

  return (
    <a
      href={validated.href}
      className={backLinkClass}
      onClick={validated.handleBackLink}
    >
      {validated.text}
    </a>
  )
}
