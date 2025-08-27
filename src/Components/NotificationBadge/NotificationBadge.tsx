import React, { FC } from 'react'
import { NotificationBadgeProps } from './NotificationBadge.types'

const NotificationBadge: FC<NotificationBadgeProps> = (props: NotificationBadgeProps) => {
  const { notificationCount } = props

  // If notification count is 0, don't render the badge
  if (notificationCount === 0) {
    return null
  } else {
    return <span className='hmrc-notification-badge'>{notificationCount > 99 ? '99+' : notificationCount}</span>
  }
}

export { NotificationBadge }
