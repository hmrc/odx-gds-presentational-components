import { ReactNode } from 'react'

export default interface ConditionalWrapperProps {
  condition: boolean
  wrapper: Function
  childrenToWrap: ReactNode
}
