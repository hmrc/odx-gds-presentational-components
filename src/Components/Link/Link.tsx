import React, { FC } from 'react'
import { classBuilder } from '../../Helpers'
import { LinkProps } from './Link.types'

const Link: FC<LinkProps> = (props: LinkProps) => {
  const { showVisitedState = true, invertColour, noUnderline, opensInNewTab } = props

  const linkClasses = classBuilder([props.className,
    'govuk-link',
    showVisitedState !== false ? null : 'govuk-link--no-visited-state',
    (invertColour != null) ? 'govuk-link--inverse' : null,
    (noUnderline != null) ? 'govuk-link--no-underline' : null
  ])
  const opensInNewTabAttributes: Partial<Pick<HTMLAnchorElement, 'rel' | 'target'>> = opensInNewTab === true ? { rel: 'noreferrer noopener', target: '_blank' } : {}

  return <a {...props} className={linkClasses} {...opensInNewTabAttributes}>{props.children}</a>
}

export { Link }
