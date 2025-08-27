import React, { FC } from 'react'
import TagProps from './Tag.types'
import { TagColour } from './TagColour'
import { classBuilder } from '../../Helpers'

export const Tag: FC<TagProps> = (props: TagProps) => {
  let colourClass = ''
  const colour =
    props.colour !== undefined
      ? (props.colour as unknown as TagColour)
      : TagColour.Default

  switch (colour) {
    case TagColour.Grey: {
      colourClass = 'govuk-tag--grey'
      break
    }
    case TagColour.Green: {
      colourClass = 'govuk-tag--green'
      break
    }
    case TagColour.Turquoise: {
      colourClass = 'govuk-tag--turquoise'
      break
    }
    case TagColour.Blue: {
      colourClass = 'govuk-tag--blue'
      break
    }
    case TagColour.LightBlue: {
      colourClass = 'govuk-tag--light-blue'
      break
    }
    case TagColour.Purple: {
      colourClass = 'govuk-tag--purple'
      break
    }
    case TagColour.Pink: {
      colourClass = 'govuk-tag--pink'
      break
    }
    case TagColour.Red: {
      colourClass = 'govuk-tag--red'
      break
    }
    case TagColour.Orange: {
      colourClass = 'govuk-tag--orange'
      break
    }
    case TagColour.Yellow: {
      colourClass = 'govuk-tag--yellow'
      break
    }
    default: {
      colourClass = 'govuk-tag--blue'
      break
    }
  }

  const activeClasses = classBuilder([
    'govuk-tag',
    colourClass,
    props.className
  ])

  return (
    <strong className={activeClasses}>
      {props.text}
    </strong>
  )
}
