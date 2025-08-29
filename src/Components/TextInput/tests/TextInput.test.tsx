import React from 'react'
import renderer from 'react-test-renderer'
import { cleanup, render } from '@testing-library/react'
import { TextInput } from '../TextInput'
import { axe, toHaveNoViolations } from 'jest-axe'
import '@testing-library/jest-dom'

/**
 * SET UP
 */

// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
afterEach(cleanup)
expect.extend(toHaveNoViolations)
const testHintText = 'testHinttext'
const testErrorText = 'something went wrong'
const testInputName = 'textInputName'
const testPrefix = '£'
const testSuffix = 'per item'

/****************
 * SNAPHOTS
 ****************/

test('Default TextInput Snapshot', () => {
  const tree = renderer
    .create(<TextInput name='defaultInput' id='default-input' label='Default Text Input' />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

test('TextInput hint and error text Snapshot', () => {
  const tree = renderer
    .create(<TextInput name='defaultInput' id='default-input' label='Default Text Input' hintText={testHintText} errorText={testErrorText} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

test('Textinputs with classes Snapshot', () => {
  const tree = renderer
    .create(<TextInput name='defaultInput' id='default-input' label='Default Text Input' inputProps={{ className: 'govuk-input--width-4 govuk-input--extra-letter-spacing' }} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

test('Textinputs with numeric input mode Snapshot', () => {
  const tree = renderer
    .create(<TextInput name='defaultInput' id='default-input' label='Default Text Input' inputProps={{ inputMode: 'numeric' }} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

test('Textinputs with only prefix Snapshot', () => {
  const tree = renderer
    .create(<TextInput name='defaultInput' id='default-input' label='Default Text Input' prefix={testPrefix} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

test('Textinputs with only suffix Snapshot', () => {
  const tree = renderer
    .create(<TextInput name='defaultInput' id='default-input' label='Default Text Input' suffix={testSuffix} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

test('Textinputs with prefix and suffix Snapshot', () => {
  const tree = renderer
    .create(<TextInput name='defaultInput' id='default-input' label='Default Text Input' prefix={testPrefix} suffix={testSuffix} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

/****************
 * ASSERTIONS
 ****************/

it('Text input must have a label', () => {
  const { container } = render(
    <TextInput name='defaultInput' id='default-input' label='Default Text Input' />
  )

  expect(container.getElementsByTagName('label')).toHaveLength(1)
})

it('When labelIsHeading, the label is wrapped in a h1', () => {
  const { container, getByRole } = render(
    <TextInput name='defaultInput' id='default-input' label='Default Text Input' />
  )

  expect(getByRole('heading')).toContainElement(container.getElementsByTagName('label')[0])
})

it('When labelIsHeading is false, the label is not wrapped in a h1', () => {
  const { queryByRole } = render(
    <TextInput name='defaultInput' id='default-input' label='Default Text Input' labelIsHeading={false} />
  )

  expect(queryByRole('heading')).toBeFalsy()
})

it('Displays hint text, if provided, with hint id based off of name', () => {
  const { container } = render(
    <TextInput name={testInputName} id='default-input' label='Default Text Input' hintText={testHintText} />
  )

  const govukHintElements = container.getElementsByClassName('govuk-hint')

  expect(govukHintElements).toHaveLength(1)
  expect(govukHintElements[0]).toHaveTextContent(testHintText)
  expect(govukHintElements[0]).toHaveAttribute('id', `${testInputName}-hint`)
})

it('Displays error message, if provided', () => {
  const { container } = render(
    <TextInput name={testInputName} id='default-input' label='Default Text Input' errorText={testErrorText} />
  )

  const govukErrorElements = container.getElementsByClassName('govuk-error-message')

  expect(govukErrorElements).toHaveLength(1)
  expect(govukErrorElements[0]).toHaveTextContent(testErrorText)
  expect(govukErrorElements[0]).toHaveAttribute('id', `${testInputName}-error`)
  expect(container.getElementsByTagName('input')[0].attributes.getNamedItem('aria-describedby')?.value.split(' ')).toContain(`${testInputName}-error`)
})

it('Displays a prefix, if provided', () => {
  const { container } = render(
    <TextInput name={testInputName} id='default-input' label='Default Text Input' errorText={testErrorText} prefix={testPrefix} />
  )

  const inputWrapper = container.getElementsByClassName('govuk-input__wrapper')[0]
  expect(inputWrapper).toBeDefined()
  expect(inputWrapper.getElementsByClassName('govuk-input__prefix')[0]).toBeTruthy()
  expect(inputWrapper.getElementsByClassName('govuk-input__prefix')[0]).toHaveAttribute('aria-hidden', 'true')
  expect(inputWrapper.getElementsByClassName('govuk-input__prefix')[0]).toHaveTextContent(testPrefix)
})

it('Displays a suffix, if provided', () => {
  const { container } = render(
    <TextInput name={testInputName} id='default-input' label='Default Text Input' errorText={testErrorText} suffix={testSuffix} />
  )

  const inputWrapper = container.getElementsByClassName('govuk-input__wrapper')[0]
  expect(inputWrapper).toBeDefined()
  expect(inputWrapper.getElementsByClassName('govuk-input__suffix')[0]).toBeTruthy()
  expect(inputWrapper.getElementsByClassName('govuk-input__suffix')[0]).toHaveAttribute('aria-hidden', 'true')
  expect(inputWrapper.getElementsByClassName('govuk-input__suffix')[0]).toHaveTextContent(testSuffix)
})

it('can handle autocomplete attributes', () => {
  const { getByRole } = render(
    <TextInput name={testInputName} id='default-input' label='Default Text Input' errorText={testErrorText} inputProps={{ autoComplete: 'postcode' }} />
  )

  expect(getByRole('textbox')).toHaveAttribute('autocomplete', 'postcode')
})

it('can handle explicit spellcheck option', () => {
  const { getByRole } = render(
    <TextInput name={testInputName} id='default-input' label='Default Text Input' errorText={testErrorText} inputProps={{ spellCheck: true }} />
  )

  expect(getByRole('textbox')).toHaveAttribute('spellcheck')
})

it('Input is populated with value, if one provided', () => {
  const testInputProps = { value: 'abc', onChange: () => {} }
  const { getByRole } = render(
    <TextInput
      name={testInputName}
      id='default-input'
      label='Default Text Input'
      errorText={testErrorText}
      inputProps={testInputProps}
      onChange={() => {}}
    />
  )

  expect(getByRole('textbox')).toHaveValue('abc')
})

/******************
 * Accessiblity tests
 */
test('Default TextInput has no axe violations', async () => {
  const { container } = render(<TextInput name='defaultInput' id='default-input' label='Default Text Input' />)
  expect(await axe(container)).toHaveNoViolations()
})

test('TextInput hint and error text has no axe violations', async () => {
  const { container } = render(<TextInput name='defaultInput' id='default-input' label='Default Text Input' hintText={testHintText} errorText={testErrorText} />)
  expect(await axe(container)).toHaveNoViolations()
})

test('Textinputs with classes has no axe violations', async () => {
  const { container } = render(<TextInput name='defaultInput' id='default-input' label='Default Text Input' inputProps={{ className: 'govuk-input--width-4 govuk-input--extra-letter-spacing' }} />)
  expect(await axe(container)).toHaveNoViolations()
})

test('Textinputs with numeric input mode has no axe violations', async () => {
  const { container } = render(<TextInput name='defaultInput' id='default-input' label='Default Text Input' inputProps={{ inputMode: 'numeric' }} />)
  expect(await axe(container)).toHaveNoViolations()
})
