import { FC } from 'react'
import ConditionalWrapperProps from './ConditionalWrapper.types'

const ConditionalWrapper: FC<ConditionalWrapperProps> = ({ condition, wrapper, childrenToWrap }: ConditionalWrapperProps) => {
  return (
    condition ? wrapper(childrenToWrap) : childrenToWrap
  )
}

export { ConditionalWrapper }
