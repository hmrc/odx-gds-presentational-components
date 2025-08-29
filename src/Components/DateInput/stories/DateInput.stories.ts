import type { Meta, StoryObj } from '@storybook/react'
import { DateInput } from '../DateInput'

const meta: Meta<typeof DateInput> = {
  title: 'GDS Components/Date Input',
  component: DateInput
}

export default meta

const defaultChangeHandler = (): void => {}

export const Default: StoryObj<typeof DateInput> = {
  args: {
    label: 'What is your date of birth?',
    legendIsHeading: true,
    name: 'DateOfBirth',
    dayField: { onChange: (defaultChangeHandler) },
    monthField: { onChange: defaultChangeHandler },
    yearField: { onChange: defaultChangeHandler }
  }
}

export const Autocomplete: StoryObj<typeof DateInput> = {
  args: {
    label: 'What is your date of birth?',
    legendIsHeading: true,
    name: 'DateOfBirth',
    autoComplete: 'bday',
    dayField: { onChange: defaultChangeHandler },
    monthField: { onChange: defaultChangeHandler },
    yearField: { onChange: defaultChangeHandler }
  }
}

export const WithDefaultValue: StoryObj<typeof DateInput> = {
  args: {
    label: 'What is your date of birth?',
    legendIsHeading: true,
    name: 'DateOfBirth',
    dayField: { onChange: defaultChangeHandler, value: '01' },
    monthField: { onChange: defaultChangeHandler, value: '12' },
    yearField: { onChange: defaultChangeHandler, value: '1999' }
  }
}

export const OverridenFieldNames: StoryObj<typeof DateInput> = {
  name: 'Overriden Field Names',
  args: {
    label: 'Beth yw eich dyddiad geni',
    legendIsHeading: true,
    name: 'DateOfBirth',
    autoComplete: 'bday',
    dayField: { onChange: defaultChangeHandler, label: 'Dydd' },
    monthField: { onChange: defaultChangeHandler, label: 'Mis' },
    yearField: { onChange: defaultChangeHandler, label: 'Blwyddyn' }
  }
}

export const GeneralError: StoryObj<typeof DateInput> = {
  args: {
    label: 'What is your date of birth?',
    legendIsHeading: true,
    name: 'DateOfBirth',
    errorText: 'Date is a required field',
    dayField: { onChange: defaultChangeHandler },
    monthField: { onChange: defaultChangeHandler },
    yearField: { onChange: defaultChangeHandler }
  }
}

export const FieldSpecificError: StoryObj<typeof DateInput> = {
  args: {
    label: 'What is your date of birth?',
    legendIsHeading: true,
    errorText: 'Month is invalid',
    name: 'DateOfBirth',
    dayField: { onChange: defaultChangeHandler, value: '01' },
    monthField: { onChange: defaultChangeHandler, value: '99', hasError: true },
    yearField: { onChange: defaultChangeHandler, value: '1999' }
  }
}
