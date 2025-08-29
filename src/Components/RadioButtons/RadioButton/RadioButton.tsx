import React, { FC, HTMLAttributes, useMemo } from 'react'
import { RadioButtonProps } from './RadioButton.types'

const RadioButton: FC<RadioButtonProps> = (props: RadioButtonProps) => {
  const { id, name, value, label, hintText, conditionalContent, onChange, defaultChecked } = props
  const inputProps: HTMLAttributes<HTMLInputElement> = {}

  const hintTextId = `${id}-item-hint`

  if (hintText !== undefined) {
    inputProps['aria-describedby'] = hintTextId
  }

  const hasHintText = useMemo(() => hintText !== undefined && hintText !== null, [hintText])

  return (
    <>
      <div className='govuk-radios__item'>
        <input {...inputProps} className='govuk-radios__input' id={id} name={name} type='radio' value={value} onChange={onChange} defaultChecked={defaultChecked} aria-describedby={hasHintText ? hintTextId : undefined} />
        <label className='govuk-label govuk-radios__label' htmlFor={id}>
          {label}
        </label>
        {
          hasHintText &&
            <div id={hintTextId} className='govuk-hint govuk-radios__hint'>
              {hintText}
            </div>
        }
      </div>
      {
        defaultChecked !== undefined && defaultChecked && conditionalContent !== undefined &&
          <div className='govuk-radios__conditional' id='conditional-contact'>
            {conditionalContent}
          </div>
      }
    </>
  )
}

export { RadioButton }
