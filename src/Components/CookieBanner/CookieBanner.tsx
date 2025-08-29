import React, { FC, useState } from 'react'
import CookieBannerProps from './CookieBanner.types'

const CookieBanner: FC<CookieBannerProps> = (props: CookieBannerProps) => {
  const {
    serviceName,
    standardDescription,
    acceptedDescription,
    rejectedDescription,
    acceptedHandler,
    rejectedHandler,
    acceptButtonText,
    rejectButtonText,
    hideCookieButtonText = 'Hide cookie message',
    cookieLink
  } = props

  const [userAction, setUserAction] = useState('no action')
  const headingValue = 'Cookies on ' + serviceName

  return userAction === 'hidden'
    ? null
    : (
      <div className='govuk-cookie-banner' data-nosnippet role='region' aria-label={headingValue}>
        <div className='govuk-cookie-banner__message govuk-width-container'>
          <div className='govuk-grid-row'>
            <div className='govuk-grid-column-two-thirds'>
              {userAction === 'no action' && <h2 className='govuk-cookie-banner__heading govuk-heading-m'>{headingValue}</h2>}
              <div className='govuk-cookie-banner__content'>
                {userAction === 'no action' ? standardDescription : userAction === 'accepted' ? acceptedDescription : rejectedDescription}
              </div>
            </div>
          </div>

          <div className='govuk-button-group'>
            {userAction === 'no action'
              ? (
                <>
                  <button
                    type='button' className='govuk-button' onClick={(event) => {
                      acceptedHandler(event)
                      setUserAction('accepted')
                    }}
                  >{acceptButtonText}
                  </button>
                  <button
                    type='button' className='govuk-button' onClick={(event) => {
                      rejectedHandler(event)
                      setUserAction('rejected')
                    }}
                  >{rejectButtonText}
                  </button>
                  <a className='govuk-link' href={cookieLink}>View cookies</a>
                </>)
              : (
                <button
                  value='yes' type='submit' name='cookies[hide]' className='govuk-button' onClick={() => {
                    setUserAction('hidden')
                  }}
                > {hideCookieButtonText}
                </button>)}
          </div>
        </div>

      </div>
      )
}

export default CookieBanner
