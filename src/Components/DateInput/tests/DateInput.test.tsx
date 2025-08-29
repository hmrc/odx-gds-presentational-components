import React from 'react'
import { cleanup, render, fireEvent } from '@testing-library/react'
import { DateInput } from '../DateInput'
import { snapshotAndAxeTest } from '../../../testHelpers'

/****************
 * SET UP
 ****************/
// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
afterEach(cleanup)
const testDateInputLabels = { day: 'Day', month: 'Month', year: 'Year' }
const testDateInputName = 'DateOfBirth'
const testDateInputLabel = 'Date of Birth'
const testDateInputChangeHandler = jest.fn(() => {})

/****************
 * SNAPHOTS AND AXE
 ****************/
snapshotAndAxeTest('Default Date Component', <DateInput
  name={testDateInputName}
  dayField={{ handleChange: testDateInputChangeHandler }}
  monthField={{ handleChange: testDateInputChangeHandler }}
  yearField={{ handleChange: testDateInputChangeHandler }}
  label={testDateInputLabel}
                                             />)

snapshotAndAxeTest('Date with Autocomplete', <DateInput
  name={testDateInputName}
  dayField={{ handleChange: testDateInputChangeHandler }}
  monthField={{ handleChange: testDateInputChangeHandler }}
  yearField={{ handleChange: testDateInputChangeHandler }}
  label={testDateInputLabel}
  autoComplete='bday'
                                             />)

snapshotAndAxeTest('Date with value', <DateInput
  name={testDateInputName}
  dayField={{ handleChange: testDateInputChangeHandler, value: '10' }}
  monthField={{ handleChange: testDateInputChangeHandler, value: '3' }}
  yearField={{ handleChange: testDateInputChangeHandler, value: '2020' }}
  label={testDateInputLabel}
                                      />)

snapshotAndAxeTest('Date with overriden field labels', <DateInput
  name={testDateInputName}
  dayField={{ handleChange: testDateInputChangeHandler, label: 'Yad' }}
  monthField={{ handleChange: testDateInputChangeHandler, label: 'Thnom' }}
  yearField={{ handleChange: testDateInputChangeHandler, label: 'Raey' }}
  label={testDateInputLabel}
                                                       />)

snapshotAndAxeTest('Date with general error', <DateInput
  name={testDateInputName}
  errorText='Date must be in the future'
  dayField={{ handleChange: testDateInputChangeHandler }}
  monthField={{ handleChange: testDateInputChangeHandler }}
  yearField={{ handleChange: testDateInputChangeHandler }}
  label={testDateInputLabel}
                                              />)

snapshotAndAxeTest('Date with error specific to single field', <DateInput
  name={testDateInputName}
  errorText='Month cannot be emtpy'
  dayField={{ handleChange: testDateInputChangeHandler }}
  monthField={{ handleChange: testDateInputChangeHandler, hasError: true }}
  yearField={{ handleChange: testDateInputChangeHandler }}
  label={testDateInputLabel}
                                                               />)

/****************
 * ASSERTIONS
 ****************/
it('Should consist of 3 date fields in a fieldset, with a legend', () => {
  const { getByRole } = render(<DateInput
    label={testDateInputLabel}
    name={testDateInputName}
    dayField={{ handleChange: testDateInputChangeHandler }}
    monthField={{ handleChange: testDateInputChangeHandler }}
    yearField={{ handleChange: testDateInputChangeHandler }}
                               />)

  const fieldset = getByRole('group')
  const dateFields = fieldset.getElementsByTagName('input')

  expect(fieldset.tagName).toBe('FIELDSET')
  expect(fieldset.getElementsByTagName('legend')).toBeTruthy()
  expect(dateFields).toHaveLength(3)
})

it('Should default to show legend as page heading', () => {
  const { getByRole } = render(<DateInput
    label={testDateInputLabel}
    name={testDateInputName}
    dayField={{ handleChange: testDateInputChangeHandler }}
    monthField={{ handleChange: testDateInputChangeHandler }}
    yearField={{ handleChange: testDateInputChangeHandler }}
                               />)

  const fieldset = getByRole('group')

  expect(fieldset.getElementsByTagName('legend')[0].getElementsByTagName('h1')).toBeTruthy()
})

it('Should not wrap legend as page heading if legendIsHeading is false', () => {
  const { getByRole } = render(<DateInput
    label={testDateInputLabel}
    name={testDateInputName}
    dayField={{ handleChange: testDateInputChangeHandler }}
    monthField={{ handleChange: testDateInputChangeHandler }}
    yearField={{ handleChange: testDateInputChangeHandler }}
    legendIsHeading={false}
                               />)

  const fieldset = getByRole('group')
  expect(fieldset.getElementsByTagName('legend')[0].getElementsByTagName('h1')).toHaveLength(0)
})

it('Should set each inputs auto complete value if autocomplete set to bday', () => {
  const { getAllByRole } = render(<DateInput
    label={testDateInputLabel}
    name={testDateInputName}
    dayField={{ handleChange: testDateInputChangeHandler }}
    monthField={{ handleChange: testDateInputChangeHandler }}
    yearField={{ handleChange: testDateInputChangeHandler }}
    autoComplete='bday'
                                  />)

  const inputs = getAllByRole('textbox')
  expect(inputs[0]).toHaveAttribute('autocomplete', 'bday-day')
  expect(inputs[1]).toHaveAttribute('autocomplete', 'bday-month')
  expect(inputs[2]).toHaveAttribute('autocomplete', 'bday-year')
})

describe.each([
  { value: undefined }, { value: null }, { value: '' }
])(
  'When autoComplete is passed $value (empty)',
  ({ value }) => {
    it('Should not set any autocomplete attribute', () => {
      const inputs = render(
        <DateInput
          label={testDateInputLabel}
          name={testDateInputName}
          dayField={{ handleChange: testDateInputChangeHandler }}
          monthField={{ handleChange: testDateInputChangeHandler }}
          yearField={{ handleChange: testDateInputChangeHandler }}
          autoComplete={value}
        />
      ).getAllByRole('textbox')

      expect(inputs[0]).not.toHaveAttribute('autocomplete')
      expect(inputs[1]).not.toHaveAttribute('autocomplete')
      expect(inputs[2]).not.toHaveAttribute('autocomplete')
    })
  }
)

it('Should handle overrides to individual input labels', () => {
  const translatedDay = 'translatedDay'
  const translatedMonth = 'translatedMonth'
  const translatedYear = 'translatedYear'

  let { queryByLabelText } = render(<DateInput
    label={testDateInputLabel}
    name={testDateInputName}
    dayField={{ handleChange: testDateInputChangeHandler, label: translatedDay }}
    monthField={{ handleChange: testDateInputChangeHandler, label: translatedMonth }}
    yearField={{ handleChange: testDateInputChangeHandler, label: translatedYear }}
                                    />)

  expect(queryByLabelText(translatedDay)).toHaveAttribute('id', `${testDateInputName}-day`)
  expect(queryByLabelText(translatedMonth)).toHaveAttribute('id', `${testDateInputName}-month`)
  expect(queryByLabelText(translatedYear)).toHaveAttribute('id', `${testDateInputName}-year`)

  cleanup()
  queryByLabelText = render(<DateInput
    label={testDateInputLabel}
    name={testDateInputName}
    dayField={{ handleChange: testDateInputChangeHandler }}
    monthField={{ handleChange: testDateInputChangeHandler }}
    yearField={{ handleChange: testDateInputChangeHandler, label: translatedYear }}
                            />).queryByLabelText

  expect(queryByLabelText(translatedYear)).toHaveAttribute('id', `${testDateInputName}-year`)
})

it('If an error relates to a specific field, it should highlight only that field', () => {
  const { queryByLabelText } = render(<DateInput
    label={testDateInputLabel}
    name={testDateInputName} dayField={{ handleChange: testDateInputChangeHandler, label: testDateInputLabels.day }}
    monthField={{ handleChange: testDateInputChangeHandler, hasError: true, label: testDateInputLabels.month }}
    yearField={{ handleChange: testDateInputChangeHandler, label: testDateInputLabels.year }}
    errorText='Month is invalid'
                                      />)

  expect(queryByLabelText(testDateInputLabels.day)?.classList).not.toContain('govuk-input--error')
  expect(queryByLabelText(testDateInputLabels.month)?.classList).toContain('govuk-input--error')
  expect(queryByLabelText(testDateInputLabels.year)?.classList).not.toContain('govuk-input--error')
})

it('Autocomplete option should be applied to each individual field', () => {
  const { queryByLabelText } = render(<DateInput
    label={testDateInputLabel}
    name={testDateInputName}
    dayField={{ handleChange: testDateInputChangeHandler, label: testDateInputLabels.day }}
    monthField={{ handleChange: testDateInputChangeHandler, hasError: true, label: testDateInputLabels.month }}
    yearField={{ handleChange: testDateInputChangeHandler, label: testDateInputLabels.year }}
    autoComplete='bday'
                                      />)

  expect(queryByLabelText(testDateInputLabels.day)).toHaveAttribute('autocomplete', 'bday-day')
  expect(queryByLabelText(testDateInputLabels.month)).toHaveAttribute('autocomplete', 'bday-month')
  expect(queryByLabelText(testDateInputLabels.year)).toHaveAttribute('autocomplete', 'bday-year')
})

it('Each input field handles its own onChange event', () => {
  const dayChangehandler = jest.fn()
  const monthChangehandler = jest.fn()
  const yearChangehandler = jest.fn()

  const { getAllByRole } = render(<DateInput
    label={testDateInputLabel}
    name={testDateInputName}
    dayField={{ handleChange: dayChangehandler, label: testDateInputLabels.day }}
    monthField={{ handleChange: monthChangehandler, hasError: true, label: testDateInputLabels.month }}
    yearField={{ handleChange: yearChangehandler, label: testDateInputLabels.year }}
    autoComplete='bday'
                                  />)

  const fields = getAllByRole('textbox')
  fields.forEach((field) => {
    fireEvent.change(field, { target: { value: '3' } })
  })

  expect(dayChangehandler).toHaveBeenCalledTimes(1)
  expect(monthChangehandler).toHaveBeenCalledTimes(1)
  expect(yearChangehandler).toHaveBeenCalledTimes(1)
})
