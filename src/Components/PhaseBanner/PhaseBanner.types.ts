import { ReactNode } from 'react'

export enum BannerTypes {
  alpha = 'Alpha',
  beta = 'Beta'
}

export interface PhaseBannerProps {
  /** The message body of the notification banner */
  children: ReactNode
  type: BannerTypes

}
