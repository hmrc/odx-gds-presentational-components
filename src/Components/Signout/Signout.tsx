import React from 'react'
import { SignoutProps } from './Signout.types'

const SignoutComponent: React.FC<SignoutProps> = (props: SignoutProps) => {
  const {
    heading,
    signInHandler,
    buttonText,
    signOutText,
    extraContent
  } = props

  return (
    <div>
      <h1 id='govuk-timeout-heading' className='govuk-heading-l'>
        {heading}
      </h1>
      {Boolean(signOutText) && <p className='govuk-body'>{signOutText}</p>}
      <div className='govuk-form-group'>
        <button
          type='button'
          className='govuk-button govuk-button--primary'
          onClick={signInHandler}
        >
          {buttonText}
        </button>
        {Boolean(extraContent) && <div>{extraContent}</div>}
      </div>
    </div>
  )
}

export { SignoutComponent }
