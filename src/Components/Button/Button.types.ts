import { MouseEventHandler } from 'react'
import { ButtonVariant } from './ButtonVariant'

export default interface ButtonProps {
  /** The text content of the button */
  text: string

  /** The button variation as set out by the GDS guidelines - Possible options are:
   * - ButtonVariant.Primary
   * - ButtonVariant.Secondary
   * - ButtonVariant.Warning
   * - ButtonVariant.Inverse
   *
   * Defaults to Primary if none selected
   */
  variant?: ButtonVariant

  /** The function to be called on button click */
  onClick: MouseEventHandler<HTMLButtonElement>

  /** Defines whether or not the button is disabled - (Not advised to use as per GDS Guidance) */
  disabled?: boolean
}
