import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SignoutComponent } from '../Signout'

const meta: Meta<typeof SignoutComponent> = {
  title: 'HMRC GDS Pages/Signout',
  component: SignoutComponent,
}

export default meta;

export const Default: StoryObj<typeof SignoutComponent> = {
  args: {
    heading: 'For your security, We have signed you out',
    signInHandler: () => { },
    buttonText: 'Sign in',
  }
}

export const WeHaveSaveYourAnswer: StoryObj<typeof SignoutComponent> = {
  args: {
    heading: 'For your security, We have signed you out',
    signInHandler: () => { },
    signOutText : 'We have saved your answers',
    buttonText: 'Sign in',
  }
}

export const BeforeYouGo: StoryObj<typeof SignoutComponent> = {
  args: {
    heading: 'For your security, We have signed you out',
    signInHandler: () => { },
    signOutText : 'We have saved your answers',
    buttonText: 'Sign in',
    extraContent: <>
      <h2 className='govuk-heading-m'>Before you go</h2>
      <p className='govuk-body'>Your feedback helps us make our service better.</p>
      <p className='govuk-body'>
        <a className='govuk-link' href={'https://www.smartsurvey.co.uk/s/YSJX8/'} target='_blank' rel='noreferrer'>
          Take our survey
        </a>{' '}
        to share your feedback on this service.
      </p>
      <p className='govuk-body'>
        <a
          lang='en'
          className='govuk-link hmrc-report-technical-issue'
          rel='noreferrer noopener'
          target='_blank'
          href={'https://www.smartsurvey.co.uk/s/YSJX8/'}
        >
          Page not working? (opens in new tab)
        </a>
      </p>
    </>
  }
}

