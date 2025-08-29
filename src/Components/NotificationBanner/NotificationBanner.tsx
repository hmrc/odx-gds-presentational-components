import React, { FC } from 'react'
import { NotificationBannerProps, BannerTypes } from './NotificationBanner.types'

export const NotificationBanner: FC<NotificationBannerProps> = (props: NotificationBannerProps) => {
  const { type, header, children } = props

  const inputClasses = type === BannerTypes.success ? 'govuk-notification-banner govuk-notification-banner--success' : 'govuk-notification-banner'
  const role = type === BannerTypes.success ? 'alert' : 'region'

  return (
    <div className={inputClasses} role={role} aria-labelledby='govuk-notification-banner-title' data-module='govuk-notification-banner'>
      <div className='govuk-notification-banner__header'>
        <h2 className='govuk-notification-banner__title' id='govuk-notification-banner-title'>
          {header}
        </h2>
      </div>
      <div className='govuk-notification-banner__content'>
        {children}
      </div>
    </div>
  )
}
