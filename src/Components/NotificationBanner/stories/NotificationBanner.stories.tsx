import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { NotificationBanner } from '../NotificationBanner'
import { BannerTypes } from '../NotificationBanner.types'

const meta: Meta<typeof NotificationBanner> = {
  title: 'GDS Components/Notification Banner',
  component: NotificationBanner
}

export default meta

export const Neutral: StoryObj<typeof NotificationBanner> = {
  args: {
    header: 'Important',
    type: BannerTypes.neutral,
    children: <>
      <p className="govuk-notification-banner__heading">
        You have 7 days left to send your application. 
         <a className="govuk-notification-banner__link" href="#">View application</a>.
      </p>
    </>
  }
}

export const Success: StoryObj<typeof NotificationBanner> = {
  args: {
    header: 'Success',
    type: BannerTypes.success,
    children: <>
      <h3 className="govuk-notification-banner__heading">
        Training outcome recorded and trainee withdrawn
      </h3>
      <p className="govuk-body">
        Contact <a className="govuk-notification-banner__link" href="#">example@department.gov.uk</a> if you think there’s a problem.
      </p>
    </>
  }
}
