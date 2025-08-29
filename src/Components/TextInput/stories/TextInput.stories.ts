import type { Meta, StoryObj } from '@storybook/react'
import { TextInput } from '../TextInput'
import StoryPhaseBannerDecorator, { StoryPhaseBannerStyles } from '../../../../.storybook/decorators/StoryPhaseBanner'

const meta: Meta<typeof TextInput> = {
  title: 'GDS Components/Text Input',
  component: TextInput
}

export default meta

export const Default: StoryObj<typeof TextInput> = {
  args: {
    label: 'What is your first name?',
    id: 'first-name',
    name: 'FirstName'
  }
}

export const LabelNotHeading: StoryObj<typeof TextInput> = {
  args: {
    label: 'What is your last name?',
    labelIsHeading: false,
    id: 'last-name',
    name: 'LastName'
  }
}

export const FixedWidth5Chars: StoryObj<typeof TextInput> = {
  args: {
    label: 'What is your first name?',
    labelIsHeading: false,
    inputProps: { className: 'govuk-input--width-5' },
    id: 'first-name',
    name: 'FirstName'
  }
}

export const WithHintText: StoryObj<typeof TextInput> = {
  args: {
    label: 'What is the name of the event?',
    labelIsHeading: false,
    hintText: 'The name you’ll use on promotional material',
    id: 'event-name',
    name: 'EventName'
  }
}

export const WithErrorText: StoryObj<typeof TextInput> = {
  args: {
    label: 'What is the name of the event?',
    labelIsHeading: false,
    hintText: 'The name you’ll use on promotional material',
    errorText: 'Enter an event name',
    id: 'event-name',
    name: 'EventName'
  }
}

export const WithAutocomplete: StoryObj<typeof TextInput> = {
  args: {
    label: 'What is your postcode?',
    id: 'postcode',
    name: 'PostCode',
    inputProps: { autoComplete: 'postal-code' }
  }
}

export const WithPrefixAndSuffix: StoryObj<typeof TextInput> = {
  parameters: {
    StoryPhaseBannerDecorator: {
      style: StoryPhaseBannerStyles.Info,
      message: `When using prefix or suffix, do not assume that the user will know NOT to include them in the input, especially as the prefix and suffix are hidden to screen readers.
      You should ensure that the data can be accepted with or without the prefix and/or suffix`
    }
  },
  decorators: [ StoryPhaseBannerDecorator ],
  args: {
    label: 'How much is the product per kilo',
    id: 'price-per-kilo',
    name: 'PricePerKilo',
    prefix: '£',
    suffix: 'per kilo'
  }
}

export const WithSpellcheck: StoryObj<typeof TextInput> = {
  args: {
    label: 'Enter some details',
    inputProps: { spellCheck: true }
  }
}