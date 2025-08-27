import React from 'react'
import { cleanup, fireEvent, render } from '@testing-library/react'
import { snapshotAndAxeTest } from '../../../testHelpers'
import { CheckBoxGroup } from '../CheckBoxGroup'
import '@testing-library/jest-dom'

/****************
 * SET UP
 ****************/
// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

const testCheckBoxGroupName = 'check-group'
const testCheckBoxGroupLabel = 'Select one option'
const testCheckBoxGroupId = 'check-group-id'
const testHintText = 'Check Group Hint Text'
const testDividerOption = { divider: 'or' }
const testOptionsList = [
  { label: 'England', value: 'england' },
  { label: 'Scotland', value: 'scotland' }
]
const testErrorText = 'Select your preferred contact method'
const testChangeHandler = (): void => {}

/****************
 * SNAPHOTS
 ****************/

snapshotAndAxeTest('Default Checkbox group',
  <CheckBoxGroup
    id={testCheckBoxGroupId}
    label={testCheckBoxGroupLabel}
    name={testCheckBoxGroupName}
    options={testOptionsList}
    onChange={testChangeHandler}
  />
)
snapshotAndAxeTest('Checkbox group with fieldset and option hint text',
  <CheckBoxGroup
    id={testCheckBoxGroupId}
    label={testCheckBoxGroupLabel}
    name={testCheckBoxGroupName}
    options={[
      { label: 'England', value: 'england', hintText: 'Yes hint' },
      { label: 'Scotland', value: 'scotland', hintText: 'No hint' }
    ]}
    hintText={testHintText}
    onChange={testChangeHandler}
  />
)
snapshotAndAxeTest('Checkbox group with divider',
  <CheckBoxGroup
    id={testCheckBoxGroupId}
    label={testCheckBoxGroupLabel}
    name={testCheckBoxGroupName}
    options={[
      { label: 'England', value: 'england', hintText: 'Yes hint' },
      testDividerOption,
      { label: 'Scotland', value: 'scotland', hintText: 'No hint' }
    ]}
    onChange={testChangeHandler}
  />
)
snapshotAndAxeTest('Checkbox group small checkboxes',
  <CheckBoxGroup
    id={testCheckBoxGroupId}
    label={testCheckBoxGroupLabel}
    name={testCheckBoxGroupName}
    options={testOptionsList}
    small
    onChange={testChangeHandler}
  />
)

snapshotAndAxeTest('Checkbox group small checkboxes, with errors',
  <CheckBoxGroup
    id={testCheckBoxGroupId}
    label={testCheckBoxGroupLabel}
    name={testCheckBoxGroupName}
    options={testOptionsList}
    small
    errorText='Please select an answer'
    onChange={testChangeHandler}
  />
)

/****************
 * ASSERTIONS
 ****************/

it('check box group renders a fieldset, with legend as provided', () => {
  const { getByRole } = render(
    <CheckBoxGroup
      options={[
        { label: 'England', value: 'england' },
        { label: 'Scotland', value: 'scotland' }
      ]}
      id={testCheckBoxGroupId}
      label={testCheckBoxGroupLabel}
      name={testCheckBoxGroupName}
      onChange={undefined}
    />
  )

  const fieldSet = getByRole('group')

  expect(fieldSet).toBeTruthy()
  expect(fieldSet.getElementsByTagName('legend')[0].textContent).toBe(testCheckBoxGroupLabel)
})

it('check box group renders hint text at the group level, if it is provided on the group component', () => {
  const { getByText, getByRole } = render(
    <CheckBoxGroup
      options={[
        { label: 'England', value: 'england' },
        { label: 'Scotland', value: 'scotland' }
      ]}
      id={testCheckBoxGroupId}
      label={testCheckBoxGroupLabel}
      name={testCheckBoxGroupName}
      hintText={testHintText}
      onChange={undefined}
    />
  )

  const fieldSet = getByRole('group')
  expect(getByText(testHintText).attributes.getNamedItem('id')?.value).toBe(fieldSet.attributes.getNamedItem('aria-describedby')?.value)
})

it('check box group renders it\'s options in the order provided', () => {
  const { getAllByRole } = render(
    <CheckBoxGroup
      options={[
        { label: 'England', value: 'england' },
        { label: 'Scotland', value: 'scotland' }
      ]}
      id={testCheckBoxGroupId}
      label={testCheckBoxGroupLabel}
      name={testCheckBoxGroupName}
      hintText={testHintText}
      onChange={undefined}
    />
  )

  expect(getAllByRole('checkbox')[0].attributes.getNamedItem('value')?.value).toBe('england')
  expect(getAllByRole('checkbox')[1].attributes.getNamedItem('value')?.value).toBe('scotland')
})

it('Renders error text, if provided, with error class and error id based on checkbox group name', () => {
  const { getByText, getByRole } = render(
    <CheckBoxGroup
      options={[
        { label: 'England', value: 'england' },
        { label: 'Scotland', value: 'scotland' }
      ]}
      id={testCheckBoxGroupId}
      label={testCheckBoxGroupLabel}
      name={testCheckBoxGroupName}
      errorText={testErrorText}
      onChange={undefined}
    />
  )

  const expectedErrorId = `${testCheckBoxGroupName}-error`

  expect(getByText(testErrorText)).toHaveAttribute('class', 'govuk-error-message')
  expect(getByText(testErrorText)).toHaveAttribute('id', expectedErrorId)
  expect(getByRole('group')).toHaveAttribute('aria-describedby', expectedErrorId)
})

it('check box group triggers the default change handler', () => {
  const { getAllByRole } = render(
    <CheckBoxGroup
      options={[
        { label: 'England', value: 'england' },
        { label: 'Scotland', value: 'scotland' }
      ]}
      id={testCheckBoxGroupId}
      label={testCheckBoxGroupLabel}
      name={testCheckBoxGroupName}
      onChange={undefined}
    />
  )

  expect(getAllByRole('checkbox')[0].attributes.getNamedItem('value')?.value).toBe('england')
  expect(getAllByRole('checkbox')[1].attributes.getNamedItem('value')?.value).toBe('scotland')
})

describe('check box group small checkboxes', () => {
  it('check box group does not append govuk-checkboxes--small class to check box wrapper, if small option is false', () => {
    const { getAllByRole } = render(
      <CheckBoxGroup
        options={[
          { label: 'England', value: 'england' },
          { label: 'Scotland', value: 'scotland' }
        ]}
        id={testCheckBoxGroupId}
        label={testCheckBoxGroupLabel}
        name={testCheckBoxGroupName}
        onChange={undefined}
      />
    )

    const firstCheck = getAllByRole('checkbox')[0]
    const checkboxInputWrapper = firstCheck.parentElement?.parentElement

    expect(checkboxInputWrapper?.className).not.toContain('govuk-checkboxes--small')
  })

  it('check box group appends govuk-checkboxes--small class to check box wrapper, if small option is true', () => {
    const { getAllByRole } = render(
      <CheckBoxGroup
        options={[
          { label: 'England', value: 'england' },
          { label: 'Scotland', value: 'scotland' }
        ]}
        id={testCheckBoxGroupId}
        label={testCheckBoxGroupLabel}
        name={testCheckBoxGroupName}
        small
        onChange={undefined}
      />
    )

    const firstCheck = getAllByRole('checkbox')[0]
    const checkboxInputWrapper = firstCheck.parentElement?.parentElement

    expect(checkboxInputWrapper?.className).toContain('govuk-checkboxes--small')
  })
})

describe('check box group text dividers', () => {
  it('If a text divider option is provided, it\'s text content is rendered in it\'s given place', () => {
    const { getByText } = render(
      <CheckBoxGroup
        options={[
          { label: 'England', value: 'england' },
          testDividerOption,
          { label: 'Scotland', value: 'scotland' }
        ]}
        id={testCheckBoxGroupId}
        label={testCheckBoxGroupLabel}
        name={testCheckBoxGroupName}
        onChange={undefined}
      />
    )

    const dividerOption = getByText(testDividerOption.divider)
    const optionWrapper = dividerOption.parentElement

    expect(dividerOption).toBeDefined()
    // Expect divider option to be second child of the options 'list' as is defined in the props
    expect(optionWrapper?.children[1]).toBe(dividerOption)
  })
})

describe('check box Group change handler', () => {
  it('If a change handler is provided, it is called when any check box in the group is changed', () => {
    const testChangeHandler = jest.fn()

    const { getAllByRole } = render(
      <CheckBoxGroup
        options={[
          { label: 'England', value: 'england' },
          { label: 'Scotland', value: 'scotland' },
          { label: 'Wales', value: 'wales' }
        ]}
        id={testCheckBoxGroupId}
        label={testCheckBoxGroupLabel}
        name={testCheckBoxGroupName}
        onChange={testChangeHandler}
      />
    )

    const checkboxes = getAllByRole('checkbox')

    fireEvent.click(checkboxes[0])
    expect(testChangeHandler).toHaveBeenCalledTimes(1)

    fireEvent.click(checkboxes[0])
    expect(testChangeHandler).toHaveBeenCalledTimes(2)

    fireEvent.click(checkboxes[1])
    expect(testChangeHandler).toHaveBeenCalledTimes(3)
  })
})
