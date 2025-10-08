import React from 'react'
import { ResearchBannerProps } from './ResearchBanner.types'
import { Link } from '../Link/Link'

export const ResearchBanner: React.FC<ResearchBannerProps> = (
  props: ResearchBannerProps
) => {
  const {
    header,
    signupLink,
    signupText,
    hideButton,
    hideButtonText,
    hideButtonAriaText,
    handleHideButtonClick
  } = props

  return (
    <div
      className='hmrc-user-research-banner hmrc-user-research-banner--show'
      data-module='hmrc-user-research-banner'
    >
      <div className='hmrc-user-research-banner__container govuk-width-container'>
        <div className='hmrc-user-research-banner__text'>
          <h2 className='govuk-heading-s hmrc-user-research-banner__title govuk-!-margin-bottom-1'>
            {header}
          </h2>
          <Link href={signupLink} invertColour opensInNewTab>
            {signupText}
          </Link>
        </div>
        {!hideButton && (
          <div className='hmrc-user-research-banner__text'>
            <button
              type='button'
              className='govuk-button govuk-button--secondary hmrc-user-research-banner__close'
              onClick={handleHideButtonClick}
            >
              <span aria-hidden='true'>{hideButtonText}</span>
              <span className='govuk-visually-hidden'>{hideButtonAriaText}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
