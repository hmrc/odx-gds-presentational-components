import React from 'react'
import { cleanup, render, fireEvent } from '@testing-library/react'
import { Select } from '../Select'
import { SelectOptions } from '../Select.types'
import { snapshotAndAxeTest } from '../../../testHelpers'
import '@testing-library/jest-dom'

/****************
 * SET UP
 ****************/
// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

const testSelectName = 'testSelectName'
const testHintText = 'testHintText'
const testErrorText = 'testErrorText'

const selectOptions: SelectOptions[] = [
  { value: 'valueOne', name: 'Test 1' },
  { value: 'valueTwo', name: 'Test 2' },
  { value: 'valueThree', name: 'Test 3' }
]
const selectOptionsWithPreselect: SelectOptions[] = [
  { value: 'valuedOne', name: 'I am not selected' },
  { value: 'valueTwo', name: 'I am not selected' },
  { value: 'valueThree', name: 'I am preselected', selected: true }
]

const mockChangeHandler = jest.fn()

/****************
 * SNAPSHOTS AND AXE
 ****************/
snapshotAndAxeTest(
  'Default select component Snapshot',
  <Select
    name='selectComponent'
    id='select-component'
    label='Select'
    selectOptions={selectOptions}
  />
)

snapshotAndAxeTest(
  'Select component with hint text and error text Snapshot',
  <Select
    name='selectComponent'
    id='select-component'
    label='Select'
    selectOptions={selectOptions}
    hintText={testHintText}
    errorText={testErrorText}
  />
)

snapshotAndAxeTest(
  'Select component with preselected option Snapshot',
  <Select
    name='selectComponent'
    id='select-component'
    label='Select'
    selectOptions={selectOptionsWithPreselect}
  />
)

/****************
 * ASSERTIONS
 ****************/

describe('Given that I am using a GDS select component', () => {
  describe('When the default select component is rendered', () => {
    it('should wrap the label in a h1 tag', () => {
      const { container, getByRole } = render(
        <Select
          name='selectComponent'
          id='select-component'
          label='Select'
          selectOptions={selectOptions}
        />
      )

      expect(getByRole('heading')).toContainElement(container.getElementsByTagName('label')[0])
    })
  })

  describe('When labelIsHeading is set to false', () => {
    it('should NOT wrap the label in a h1 tag', () => {
      const { queryByRole } = render(
        <Select
          name='selectComponent'
          id='select-component'
          label='Select'
          selectOptions={selectOptions}
          labelIsHeading={false}
        />
      )

      expect(queryByRole('heading')).toBeFalsy()
    })
  })

  describe('When hint text is provided', () => {
    it('displays this hint text with a hint id based off of name', () => {
      const { container } = render(
        <Select
          name={testSelectName}
          id='select-component'
          label='Select'
          selectOptions={selectOptions}
          hintText={testHintText}
        />
      )

      const govukHintElements = container.getElementsByClassName('govuk-hint')

      expect(govukHintElements).toHaveLength(1)
      expect(govukHintElements[0]).toHaveTextContent(testHintText)
      expect(govukHintElements[0]).toHaveAttribute('id', `${testSelectName}-hint`)
    })
  })

  describe('When error text is provided', () => {
    it('displays this error text', () => {
      const { container } = render(
        <Select
          name={testSelectName}
          id='select-component'
          label='Select'
          selectOptions={selectOptions}
          errorText={testErrorText}
        />
      )

      const govukErrorElements = container.getElementsByClassName('govuk-error-message')

      expect(govukErrorElements).toHaveLength(1)
      expect(govukErrorElements[0]).toHaveTextContent(testErrorText)
      expect(govukErrorElements[0]).toHaveAttribute('id', `${testSelectName}-error`)
    })
  })

  describe('When there is no preselected option passed to the component', () => {
    it('displays the item at index 0 of selectOptions by default', () => {
      const { getByRole } = render(
        <Select
          name='selectComponent'
          id='select-component'
          label='Select'
          selectOptions={selectOptions}
        />
      )

      const selectElement = getByRole('combobox')
      expect(selectElement).toHaveValue(selectOptions[0].value)
      expect(selectElement).toHaveTextContent(selectOptions[0].name)
    })
  })

  describe('When selected: true is passed alongside an item in selectOptions', () => {
    it('displays this item as the default selection', () => {
      const { getByRole } = render(
        <Select
          name='selectComponent'
          id='select-component'
          label='Select'
          selectOptions={selectOptionsWithPreselect}
        />
      )

      const selectElement = getByRole('combobox')
      expect(selectElement).toHaveValue(selectOptionsWithPreselect[2].value)
      expect(selectElement).toHaveTextContent(selectOptionsWithPreselect[2].name)
    })
  })

  describe('When selectOptions are passed to the component', () => {
    it('renders all options as <option> elements in the select dropdown', () => {
      const { getAllByRole } = render(
        <Select
          name='selectComponent'
          id='select-component'
          label='Select'
          selectOptions={selectOptions}
        />
      )

      const options = getAllByRole('option')
      expect(options).toHaveLength(selectOptions.length)

      selectOptions.forEach((option, index) => {
        expect(options[index]).toHaveValue(option.value)
        expect(options[index]).toHaveTextContent(option.name)
      })
    })
  })

  describe('When the user selects a different option', () => {
    it('calls the onChange handler with the selected value', async () => {
      const { getByRole } = render(
        <Select
          name='selectComponent'
          id='select-component'
          label='Select'
          selectOptions={selectOptions}
          onChange={mockChangeHandler}
        />
      )

      const selectElement = getByRole('combobox') as HTMLSelectElement

      // Simulate changing the selected option
      fireEvent.change(selectElement, { target: { value: selectOptions[1].value } })

      // Ensure the mockChangeHandler was called with the correct value
      expect(mockChangeHandler).toHaveBeenCalledTimes(1)
      expect(mockChangeHandler).toHaveBeenCalledWith(expect.objectContaining({
        target: expect.objectContaining({ value: selectOptions[1].value })
      }))
    })
  })
})
