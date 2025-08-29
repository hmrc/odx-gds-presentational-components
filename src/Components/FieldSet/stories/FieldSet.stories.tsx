import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { FieldSet } from '../FieldSet'
import { TextInput } from '../../TextInput/TextInput'
import { RadioButton } from '../../RadioButtons/RadioButton'
import StoryPhaseBannerDecorator, { StoryPhaseBannerStyles  } from '../../../../.storybook/decorators/StoryPhaseBanner'
import TextInputProps from '../../TextInput/TextInput.types'

const meta: Meta<typeof FieldSet> = {
  title: 'GDS Components/Field Set',
  component: FieldSet
}

export default meta

const dummyTextInput = (label: string, inputProps: Partial<TextInputProps> = {}) => <div className='govuk-form-group'>
  <TextInput name={label} id={label} label={label} labelIsHeading={false} {...inputProps} />
</div>
const dummyRadioButton = ({label}:{label:string}) => (
  <RadioButton id={label} name={label} value={label} label={label}/>
)


const defaultAddressSet = (
  <>
    {dummyTextInput('Address line 1')}
    {dummyTextInput('Town or city', { inputProps: { className: 'govuk-!-width-two-thirds' } })}
    {dummyTextInput('Postcode', { inputProps: { className: 'govuk-input--width-10' } })}
  </>
)


export const Default: StoryObj<typeof FieldSet> = {
  parameters: {
    StoryPhaseBannerDecorator: {
      style: StoryPhaseBannerStyles.Guideline,
      message: `If fieldset is being used to wrap inputs for different values (i.e. not checkboxes or radiobuttons), errors should be shown on indidivual inputs, not the
      fieldset`
    }
  },
  decorators: [ StoryPhaseBannerDecorator ],
  args: {
    label: 'What is your address?',
    name: 'FieldSet',
    children: defaultAddressSet
  }
}

export const WithHintAndErrorText: StoryObj<typeof FieldSet> = {
  parameters: {
    StoryPhaseBannerDecorator: {
      style: StoryPhaseBannerStyles.Info,
      message: `The Radio Button Component renders it\'s own Fieldset so there is no need to
      manually wrap it in one. This is simply an example to show the fieldset error prop in use`
    }
  },
  decorators: [ StoryPhaseBannerDecorator ],
  args: {
    label: 'Which country?',
    name: 'FieldSet',
    children: (
      <>
        {dummyRadioButton({label:'England'})}
        {dummyRadioButton({label:'Scotland'})}
        {dummyRadioButton({label:'Wales'})}
        {dummyRadioButton({label:'Ireland'})}
      </>
    ),
    hintText: 'This is the country in which you were born',
    errorText: 'You must select a country'
  }
}

export const LegendWithExtraContent: StoryObj<typeof FieldSet> = {
  parameters: {
    StoryPhaseBannerDecorator: {
      style: StoryPhaseBannerStyles.Guideline,
      message: `If fieldset is being used to wrap inputs for different values (i.e. not checkboxes or radiobuttons), errors should be shown on indidivual inputs, not the
      fieldset`
    }
  },
  decorators: [ StoryPhaseBannerDecorator ],
  args: {
    label: 'What is your address?',
    name: 'FieldSet',
    legendContent: <div className='govuk-body'>Legend Help Content example</div>,
    children: defaultAddressSet
  }
}

export const OverridenLegendClass: StoryObj<typeof FieldSet> = {
  parameters: {
    StoryPhaseBannerDecorator: {
      style: StoryPhaseBannerStyles.Guideline,
      message: `If fieldset is being used to wrap inputs for different values (i.e. not checkboxes or radiobuttons), errors should be shown on indidivual inputs, not the
      fieldset`
    }
  },
  decorators: [ StoryPhaseBannerDecorator ],
  args: {
    label: 'What is your address?',
    name: 'FieldSet',
    legendContent: <div className='govuk-body'>Legend Help Content example</div>,
    legendClassOverrides: 'govuk-fieldset__legend--m',
    legendIsHeading: false,
    children: defaultAddressSet
  }
}