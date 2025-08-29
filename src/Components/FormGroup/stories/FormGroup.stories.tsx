import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { FormGroup } from '../FormGroup'

const meta: Meta<typeof FormGroup> = {
  title: 'Infrastructure/Form Group',
  component: FormGroup
}

export default meta

const dummyTextInput = (
  <input className="govuk-input" type="text"></input>
)

export const Default: StoryObj<typeof FormGroup> = {
  args: {
    label: 'Form group label',
    id: 'formggroup-id',
    name: 'formgroupName',
    children: dummyTextInput
  }
}

export const LabelNotHeading: StoryObj<typeof FormGroup> = {
  args: {
    label: 'Form group label',
    id: 'formggroup-id',
    name: 'formgroupName',
    labelIsHeading: false,
    children: dummyTextInput
  }
}

export const HintText: StoryObj<typeof FormGroup> = {
  args: {
    label: 'Form group label',
    id: 'formggroup-id',
    name: 'formgroupName',
    hintText: 'Some hint text here',
    children: dummyTextInput
  }
}

export const ErrorText: StoryObj<typeof FormGroup> = {
  args: {
    label: 'Form group label',
    id: 'formggroup-id',
    name: 'formgroupName',
    errorText: 'An Error Message',
    children: dummyTextInput
  }
}

export const OverrideErrorTextPrefix: StoryObj<typeof FormGroup> = {
  args: {
    label: 'Form group label',
    id: 'formggroup-id',
    name: 'formgroupName',
    errorText: 'An Error Message',
    children: dummyTextInput,
    errorPrefix: 'Gwall'
  }
}

export const AdditionalLabelClasses: StoryObj<typeof FormGroup> = {
  args: {
    label: 'Form group label',
    id: 'formggroup-id',
    name: 'formgroupName',
    labelClasses: 'govuk-!-font-size-80',
    children: dummyTextInput
  }
}
