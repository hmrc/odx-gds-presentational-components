import React, { FC } from 'react'
import { StartButtonProps } from './StartButton.types'
import StartNowArrow from '../Icons/StartButtonArrow'

const StartButton: FC<StartButtonProps> = (props: StartButtonProps) => {
  const { text = 'Start now', href, onClick } = props

  return (
    <a href={href} role='button' onClick={onClick} draggable='false' className='govuk-button govuk-button--start'>
      {text}
      {StartNowArrow}
    </a>
  )
}

export { StartButton }
