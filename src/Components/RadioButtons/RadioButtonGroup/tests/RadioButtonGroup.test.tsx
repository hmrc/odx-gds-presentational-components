import React from 'react'
import { cleanup, fireEvent, render } from '@testing-library/react'
import { snapshotAndAxeTest } from '../../../../testHelpers'
import { RadioButtonGroup } from '..'
import '@testing-library/jest-dom'

/****************
 * SET UP
 ****************/
// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

const testRadioGroupName = 'radio-group'
const testRadioGroupLabel = 'Select one option'
const testRadioGroupId = 'radio-group-id'
const testHintText = 'Radio Group Hint Text'
const testDividerOption = { divider: 'or' }
const testOptionsList = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' }
]

/****************
 * SNAPHOTS
 ****************/

snapshotAndAxeTest('Default Radio group',
  <RadioButtonGroup
    id={testRadioGroupId}
    label={testRadioGroupLabel}
    name={testRadioGroupName}
    options={testOptionsList}
  />
)
snapshotAndAxeTest('Radio group with fieldset and option hint text',
  <RadioButtonGroup
    id={testRadioGroupId}
    label={testRadioGroupLabel}
    name={testRadioGroupName}
    options={[
      { label: 'Yes', value: 'yes', hintText: 'Yes hint' },
      { label: 'No', value: 'no', hintText: 'No hint' }
    ]}
    hintText={testHintText}
  />
)
snapshotAndAxeTest('Radio group with divider',
  <RadioButtonGroup
    id={testRadioGroupId}
    label={testRadioGroupLabel}
    name={testRadioGroupName}
    options={[
      { label: 'Yes', value: 'yes', hintText: 'Yes hint' },
      testDividerOption,
      { label: 'No', value: 'no', hintText: 'No hint' }
    ]}
  />
)
snapshotAndAxeTest('Radio group inline display',
  <RadioButtonGroup
    id={testRadioGroupId}
    label={testRadioGroupLabel}
    name={testRadioGroupName}
    options={testOptionsList}
    inline
  />
)
snapshotAndAxeTest('Radio group small radios',
  <RadioButtonGroup
    id={testRadioGroupId}
    label={testRadioGroupLabel}
    name={testRadioGroupName}
    options={testOptionsList}
    small
  />
)

snapshotAndAxeTest('Radio group small radios, inline with errors',
  <RadioButtonGroup
    id={testRadioGroupId}
    label={testRadioGroupLabel}
    name={testRadioGroupName}
    options={testOptionsList}
    small
    inline
    errorText='Please select an answer'
  />
)

/****************
 * ASSERTIONS
 ****************/

it('Radio button group renders a fieldset, with legend as provided', () => {
  const { getByRole } = render(
    <RadioButtonGroup
      options={[
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]}
      id={testRadioGroupId}
      label={testRadioGroupLabel}
      name={testRadioGroupName}
    />
  )

  const fieldSet = getByRole('group')

  expect(fieldSet).toBeTruthy()
  expect(fieldSet.getElementsByTagName('legend')[0].textContent).toBe(testRadioGroupLabel)
})

it('Radio button group renders hint text at the group level, if it is provided on the group component', () => {
  const { getByText, getByRole } = render(
    <RadioButtonGroup
      options={[
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]}
      id={testRadioGroupId}
      label={testRadioGroupLabel}
      name={testRadioGroupName}
      hintText={testHintText}
    />
  )

  const fieldSet = getByRole('group')
  expect(getByText(testHintText).attributes.getNamedItem('id')?.value).toBe(fieldSet.attributes.getNamedItem('aria-describedby')?.value)
})

it('Radio button group renders it\'s options in the order provided', () => {
  const { getAllByRole } = render(
    <RadioButtonGroup
      options={[
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]}
      id={testRadioGroupId}
      label={testRadioGroupLabel}
      name={testRadioGroupName}
      hintText={testHintText}
    />
  )

  expect(getAllByRole('radio')[0].attributes.getNamedItem('value')?.value).toBe('yes')
  expect(getAllByRole('radio')[1].attributes.getNamedItem('value')?.value).toBe('no')
})

describe('Radio button inline radios', () => {
  it('Radio button group does not append govuk-radios--inline class to radio button wrapper, if inline option is false', () => {
    const { getAllByRole } = render(
      <RadioButtonGroup
        options={[
          { label: 'Yes', value: 'yes' },
          { label: 'No', value: 'no' }
        ]}
        id={testRadioGroupId}
        label={testRadioGroupLabel}
        name={testRadioGroupName}
      />
    )

    const firstRadio = getAllByRole('radio')[0]
    const radioInputWrapper = firstRadio.parentElement?.parentElement

    expect(radioInputWrapper?.className).not.toContain('govuk-radios--inline')
  })

  it('Radio button group appends govuk-radios--inline class to radio button wrapper, if inline option is true', () => {
    const { getAllByRole } = render(
      <RadioButtonGroup
        options={[
          { label: 'Yes', value: 'yes' },
          { label: 'No', value: 'no' }
        ]}
        id={testRadioGroupId}
        label={testRadioGroupLabel}
        name={testRadioGroupName}
        inline
      />
    )

    const firstRadio = getAllByRole('radio')[0]
    const radioInputWrapper = firstRadio.parentElement?.parentElement

    expect(radioInputWrapper?.className).toContain('govuk-radios--inline')
  })
})

describe('Radio button group small radios', () => {
  it('Radio button group does not append govuk-radios--small class to radio button wrapper, if small option is false', () => {
    const { getAllByRole } = render(
      <RadioButtonGroup
        options={[
          { label: 'Yes', value: 'yes' },
          { label: 'No', value: 'no' }
        ]}
        id={testRadioGroupId}
        label={testRadioGroupLabel}
        name={testRadioGroupName}
      />
    )

    const firstRadio = getAllByRole('radio')[0]
    const radioInputWrapper = firstRadio.parentElement?.parentElement

    expect(radioInputWrapper?.className).not.toContain('govuk-radios--small')
  })

  it('Radio button group appends govuk-radios--small class to radio button wrapper, if small option is true', () => {
    const { getAllByRole } = render(
      <RadioButtonGroup
        options={[
          { label: 'Yes', value: 'yes' },
          { label: 'No', value: 'no' }
        ]}
        id={testRadioGroupId}
        label={testRadioGroupLabel}
        name={testRadioGroupName}
        small
      />
    )

    const firstRadio = getAllByRole('radio')[0]
    const radioInputWrapper = firstRadio.parentElement?.parentElement

    expect(radioInputWrapper?.className).toContain('govuk-radios--small')
  })
})

describe('Radio button group text dividers', () => {
  it('If a text divider option is provided, it\'s text content is rendered in it\'s given place', () => {
    const { getByText } = render(
      <RadioButtonGroup
        options={[
          { label: 'Yes', value: 'yes' },
          testDividerOption,
          { label: 'No', value: 'no' }
        ]}
        id={testRadioGroupId}
        label={testRadioGroupLabel}
        name={testRadioGroupName}
      />
    )

    const dividerOption = getByText(testDividerOption.divider)
    const optionWrapper = dividerOption.parentElement

    expect(dividerOption).toBeDefined()
    // Expect divider option to be second child of the options 'list' as is defined in the props
    expect(optionWrapper?.children[1]).toBe(dividerOption)
  })
})

describe('Radio button Group change handler', () => {
  it('By default, if no change handler is provided, on change of a radio button in the group, it is checked and others are unchecked', async () => {
    const { getAllByRole } = render(
      <RadioButtonGroup
        options={[
          { label: 'Yes', value: 'yes' },
          { label: 'No', value: 'no' },
          { label: 'Other', value: 'other' }
        ]}
        id={testRadioGroupId}
        label={testRadioGroupLabel}
        name={testRadioGroupName}
      />
    )

    const radioButtons = getAllByRole('radio')

    await fireEvent.click(radioButtons[0])
    expect(radioButtons[0].attributes.getNamedItem('checked')).toBeTruthy()
    expect(radioButtons[1].attributes.getNamedItem('checked')).toBeFalsy()
    expect(radioButtons[2].attributes.getNamedItem('checked')).toBeFalsy()

    await fireEvent.click(radioButtons[1])
    expect(radioButtons[0].attributes.getNamedItem('checked')).toBeFalsy()
    expect(radioButtons[1].attributes.getNamedItem('checked')).toBeTruthy()
    expect(radioButtons[2].attributes.getNamedItem('checked')).toBeFalsy()
  })

  it('If a change handler is provided, it is called when any radio button in the group is changed', () => {
    const testChangeHandler = jest.fn()

    const { getAllByRole } = render(
      <RadioButtonGroup
        options={[
          { label: 'Yes', value: 'yes' },
          { label: 'No', value: 'no' },
          { label: 'Other', value: 'other' }
        ]}
        id={testRadioGroupId}
        label={testRadioGroupLabel}
        name={testRadioGroupName}
        onChange={testChangeHandler}
      />
    )

    const radioButtons = getAllByRole('radio')

    fireEvent.click(radioButtons[0])
    expect(testChangeHandler).toHaveBeenCalledTimes(1)

    fireEvent.click(radioButtons[0])
    expect(testChangeHandler).toHaveBeenCalledTimes(1)

    fireEvent.click(radioButtons[1])
    expect(testChangeHandler).toHaveBeenCalledTimes(2)
  })
})
