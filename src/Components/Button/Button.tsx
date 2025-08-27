import React, { FC } from 'react'
import ButtonProps from './Button.types'
import { ButtonVariant } from '.'
import { classBuilder } from '../../Helpers'

export const Button: FC<ButtonProps> = (props: ButtonProps) => {
  let variationClass = ''
  const variation =
    props.variant !== undefined
      ? (props.variant as unknown as ButtonVariant)
      : ButtonVariant.Default

  switch (variation) {
    case ButtonVariant.Secondary:
      variationClass = 'govuk-button--secondary'
      break
    case ButtonVariant.Warning:
      variationClass = 'govuk-button--warning'
      break
    case ButtonVariant.Inverse:
      variationClass = 'govuk-button--inverse'
      break
    default: {
      variationClass = ''
      break
    }
  }

  const activeClasses = classBuilder([
    'govuk-button',
    variationClass
  ])

  return (
    <button
      className={activeClasses}
      disabled={props.disabled}
      aria-disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  )
}
