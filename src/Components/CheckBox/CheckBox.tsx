import React, { FC } from 'react'
import { CheckBoxProps } from './CheckBox.types'

const CheckBox: FC<CheckBoxProps> = (props: CheckBoxProps) => {
  const { id, name, value, label, hintText, conditionalContent, onChange, defaultChecked, behaviour } = props

  const hintTextId = `${id}-item-hint`
  const hasHintText = hintText !== undefined && hintText !== null

  return (
    <>
      <div className='govuk-checkboxes__item'>
        <input data-behaviour={behaviour} className='govuk-checkboxes__input' id={id} name={name} type='checkbox' value={value} onChange={onChange} checked={defaultChecked} {...(hasHintText && { 'aria-describedby': hintTextId })} />
        <label className='govuk-label govuk-checkboxes__label' htmlFor={id}>
          {label}
        </label>
        {
          hasHintText &&
            <div id={hintTextId} className='govuk-hint govuk-checkboxes__hint'>
              {hintText}
            </div>
        }
      </div>
      {
        defaultChecked !== undefined && defaultChecked && conditionalContent !== undefined &&
          <div className='govuk-checkboxes__conditional' id={`${id}-contact`}>
            {conditionalContent}
          </div>
      }
    </>
  )
}

export { CheckBox }
