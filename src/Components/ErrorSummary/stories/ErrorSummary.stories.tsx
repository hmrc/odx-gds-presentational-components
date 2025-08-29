import React, { useState, useRef } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ErrorSummary } from '../ErrorSummary'
import StoryPhaseBannerDecorator, { StoryPhaseBannerStyles} from '../../../../.storybook/decorators/StoryPhaseBanner'
import { TextInput, Button, CheckBoxGroup } from '../..'

const meta: Meta<typeof ErrorSummary> = {
  title: 'GDS Components/Error Summary',
  component: ErrorSummary
}

export default meta


export const Default: StoryObj<typeof ErrorSummary> = {
  args: {
      errorDetails: [
          {message: 'Enter a name', targetFieldId: 'name'},
          {message: 'Date must be in the future', targetFieldId: 'date'}
      ]
  }
}

export const CustomSummmaryHeading: StoryObj<typeof ErrorSummary> = {
  parameters: {
    StoryPhaseBannerDecorator: {
      style: StoryPhaseBannerStyles.NotAdvised,
      message: `Per GDS guidelines, the heading \'There is a problem\' should be used. Overriding the heading is \'off-pattern\' and should only be used if you are
        expecting to break with the Error Summary pattern`
    }
  },
  args: {
      errorDetails: [
          {message: 'Enter a name', targetFieldId: 'name'},
          {message: 'Date must be in the future', targetFieldId: 'date'}
      ],
      heading: 'You need to review the below errors'
  },
  decorators: [ StoryPhaseBannerDecorator ]
}

export const WorkingExample: StoryObj<typeof ErrorSummary> = {
  render: () => {
    const nameFieldId = 'name'
    const contactPreferenceFieldId = 'contact-preference'

    const [errors, setErrors] = useState<Array<{targetFieldId: string, message: string}>>([])
    const [name, setName] = useState('')
    const [contactPreferences, setContactPreferences] = useState([])

    function nameOnChange(event) {
      setName(event.target.value)
    }
    function nameValidation(value: string | undefined) {
      if(value === undefined|| value === null || value === ''){
        return {targetFieldId: nameFieldId, message: 'Enter your name'}
      } else if (value.match(/[^A-z]/g)) {
        return {targetFieldId: nameFieldId, message: 'Name must only contain letters'}
      }
    }
    function contactPreferenceOnChange(event) {
        if(event.target.checked) {
          setContactPreferences([...contactPreferences, event.target.value])
        }else{
          setContactPreferences([...contactPreferences.filter(v => v !== event.target.value)])
        }
    }
    function contactPreferenceValidation(value) {
      if(value.length === 0){
        return {targetFieldId: contactPreferenceFieldId, message: 'Select at least one preferred contact method'}
      }
    }

    return (
      <>
        <div className='govuk-body'>
          In this example, the fields have some validation, which will throw errors.
          The first field will throw an error if left empty, or if any non letter characters are included.
          The second field will throw an error if no options are selected.
          To see the error summary, leave either ot both fields in an error state and click submit.
        </div>

        { errors.length > 0 && <ErrorSummary errorDetails={errors}/> }

        <h1 className='govuk-heading-l'>Your contact details</h1>

        <TextInput id={nameFieldId} name='name' label='Your name' value={name} onBlur={nameOnChange} labelIsHeading={false}/>
        <CheckBoxGroup label='How would you like to be contacted?'
        id={contactPreferenceFieldId}
        legendIsHeading={false}
        hintText='Select all options that are relevant to you'
        onChange={contactPreferenceOnChange}
        value={contactPreferences}
        options={[
          {
              label: 'Email',
              value: 'email'
          },
          {
              label: 'Phone',
              value: 'phone'
          },
          {
              label: 'Text message',
              value: 'text'
          }
        ]}
        name='contactPreference'
        />

        <Button onClick={() => {
          const nameError = nameValidation(name)
          const contactPreferenceError = contactPreferenceValidation(contactPreferences)
          const errors = []
          nameError !== undefined && errors.push(nameError)
          contactPreferenceError !== undefined && errors.push(contactPreferenceError)
          setErrors(errors)
        }}
        text='Submit' />
      </>
    )
  }
}