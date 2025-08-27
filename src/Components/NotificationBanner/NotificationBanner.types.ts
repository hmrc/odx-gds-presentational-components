import { ReactNode } from 'react'

export enum BannerTypes {
  neutral = 'neutral',
  success = 'success'
}

export interface NotificationBannerProps {
  /** The message body of the notification banner */
  children: ReactNode

  /** Properties for the title of the notification banner */
  header: string
  /** Properties which decides the notification banner theme */
  type: BannerTypes

}
