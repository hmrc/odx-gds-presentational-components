import React from 'react'
import { FormGroup, makeHintId, makeErrorId } from '../FormGroup'
import { cleanup, render } from '@testing-library/react'
import { snapshotAndAxeTest } from '../../../testHelpers'
import '@testing-library/jest-dom'

/****************
 * SET UP
 ****************/
// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

const testFormgroupLabel = 'Form Group Test Label'
const testFormgroupName = 'FormgroupTestName'
const testFormgroupId = 'formgroup-id'
const testHintText = 'hint text'
const testErrorText = 'Error message'

/****************
 * SNAPHOTS AND AXE
 ****************/
snapshotAndAxeTest('Formgroup default', <FormGroup label={testFormgroupLabel} name={testFormgroupName} id={testFormgroupId} />)
snapshotAndAxeTest('Formgroup label not heading',
  <FormGroup label={testFormgroupLabel} name={testFormgroupName} id={testFormgroupId} labelIsHeading={false}>
    <input />
  </FormGroup>)
snapshotAndAxeTest('Formgroup with error', <FormGroup label={testFormgroupLabel} name={testFormgroupName} id={testFormgroupId} errorText={testErrorText} />)
snapshotAndAxeTest('Formgroup overriden error prefix', <FormGroup label={testFormgroupLabel} name={testFormgroupName} id={testFormgroupId} errorPrefix='Gwall' />)

snapshotAndAxeTest('Formgroup with hint text', <FormGroup label={testFormgroupLabel} name={testFormgroupName} id={testFormgroupId} hintText={testHintText} />)
snapshotAndAxeTest('Formgroup with hint and error', <FormGroup label={testFormgroupLabel} name={testFormgroupName} id={testFormgroupId} hintText={testHintText} errorText={testErrorText} />)
snapshotAndAxeTest('Formgroup with children',
  <FormGroup label={testFormgroupLabel} name={testFormgroupName} id={testFormgroupId} hintText={testHintText} errorText={testErrorText}>
    <input id='inner-input' />
  </FormGroup>)
snapshotAndAxeTest('Formgroup with label classes', <FormGroup label={testFormgroupLabel} name={testFormgroupName} id={testFormgroupId} hintText={testHintText} labelClasses='govuk-heading-xl' />)

snapshotAndAxeTest('Formgroup with string children', <FormGroup label={testFormgroupLabel} name={testFormgroupName} id={testFormgroupId} hintText={testHintText}>Plain Text</FormGroup>)
snapshotAndAxeTest('Formgroup with functional component children',
  <FormGroup label={testFormgroupLabel} name={testFormgroupName} id={testFormgroupId} hintText={testHintText}>
    {
      (formGroupInputProps) => <div><span>Before</span><input {...formGroupInputProps} /></div>
    }
  </FormGroup>)

/****************
 * ASSERTIONS
 ****************/

it('Renders inner children with ', () => {
  const formGroupInnerChildTestId = 'formgroup-inner-test'
  const innerInput = <input data-testid={formGroupInnerChildTestId} />
  const { getByTestId } = render(
    <FormGroup label={testFormgroupLabel} name={testFormgroupName} id={testFormgroupId}>{innerInput}</FormGroup>
  )

  expect(getByTestId(formGroupInnerChildTestId)).toBeTruthy()
})

it('Renders label as heading by default ', () => {
  const formGroupInnerChildTestId = 'formgroup-inner-test'
  const innerInput = <input data-testid={formGroupInnerChildTestId} />
  const { getByText } = render(
    <FormGroup label={testFormgroupLabel} name={testFormgroupName} id={testFormgroupId}>{innerInput}</FormGroup>
  )

  expect(getByText(testFormgroupLabel).parentElement?.tagName).toBe('H1')
})

it('Renders label not as heading if labelIsHeading is false', () => {
  const formGroupInnerChildTestId = 'formgroup-inner-test'
  const innerInput = <input data-testid={formGroupInnerChildTestId} />
  const { getByText } = render(
    <FormGroup label={testFormgroupLabel} name={testFormgroupName} id={testFormgroupId} labelIsHeading={false}>{innerInput}</FormGroup>
  )

  expect(getByText(testFormgroupLabel).parentElement?.tagName).not.toBe('H1')
})

it('Renders hint text, if provided, with hint class and hint id based on formgroup name', () => {
  const formGroupInnerChildTestId = 'formgroup-inner-test'
  const innerInput = <input data-testid={formGroupInnerChildTestId} />
  const { getByText, getByTestId } = render(
    <FormGroup label={testFormgroupLabel} name={testFormgroupName} id={testFormgroupId} hintText={testHintText}>{innerInput}</FormGroup>
  )

  const expectedHintId = `${testFormgroupName}-hint`

  expect(getByText(testHintText)).toHaveAttribute('class', 'govuk-hint')
  expect(getByText(testHintText)).toHaveAttribute('id', expectedHintId)
  expect(getByTestId(formGroupInnerChildTestId)).toHaveAttribute('aria-describedby', expectedHintId)
})

it('Renders error text, if provided, with error class and error id based on formgroup name', () => {
  const formGroupInnerChildTestId = 'formgroup-inner-test'
  const innerInput = <input data-testid={formGroupInnerChildTestId} />
  const { getByText, getByTestId } = render(
    <FormGroup label={testFormgroupLabel} name={testFormgroupName} id={testFormgroupId} errorText={testErrorText}>{innerInput}</FormGroup>
  )

  const expectedErrorId = `${testFormgroupName}-error`

  expect(getByText(testErrorText)).toHaveAttribute('class', 'govuk-error-message')
  expect(getByText(testErrorText)).toHaveAttribute('id', expectedErrorId)
  expect(getByTestId(formGroupInnerChildTestId)).toHaveAttribute('aria-describedby', expectedErrorId)
})

it('Can render functional component child with aria-describedby id if hint text present', () => {
  const formGroupInnerChildTestId = 'formgroup-inner-test'
  const { getByTestId } = render(
    <FormGroup label={testFormgroupLabel} name={testFormgroupName} id={testFormgroupId} errorText={testErrorText}>{
      (formGroupInputProps: any) => <div><span>Prefix:</span><input {...formGroupInputProps} data-testid={formGroupInnerChildTestId} /></div>
    }
    </FormGroup>
  )

  expect(getByTestId(formGroupInnerChildTestId)).toHaveAttribute('aria-describedby', `${testFormgroupName}-error`)
})

it('renders non functional, non react element children \'as is\'', () => {
  const testPlainText = 'Plain text'
  const { getByText } = render(
    <FormGroup label={testFormgroupLabel} name={testFormgroupName} id={testFormgroupId} hintText={testHintText}>{testPlainText}</FormGroup>
  )

  expect(getByText(testPlainText)).toBeTruthy()
})

it('Prefixes error text, if provided, with hidden Error prefix for screen readers', () => {
  const formGroupInnerChildTestId = 'formgroup-inner-test'
  const innerInput = <input data-testid={formGroupInnerChildTestId} />
  const { getByText } = render(
    <FormGroup label={testFormgroupLabel} name={testFormgroupName} id={testFormgroupId} errorText={testErrorText}>{innerInput}</FormGroup>
  )

  expect(getByText(testErrorText).getElementsByTagName('span')).toHaveLength(1)
  expect(getByText(testErrorText).getElementsByTagName('span')[0]).toHaveTextContent('Error:')
  expect(getByText(testErrorText).getElementsByTagName('span')[0]).toHaveAttribute('class', 'govuk-visually-hidden')
})

it('Error text prefix can be overriden', () => {
  const formGroupInnerChildTestId = 'formgroup-inner-test'
  const errorPrefixTranslation = 'Gwall'
  const innerInput = <input data-testid={formGroupInnerChildTestId} />
  const { getByText } = render(
    <FormGroup label={testFormgroupLabel} name={testFormgroupName} id={testFormgroupId} errorText={testErrorText} errorPrefix={errorPrefixTranslation}>{innerInput}</FormGroup>
  )

  expect(getByText(testErrorText).getElementsByTagName('span')).toHaveLength(1)
  expect(getByText(testErrorText).getElementsByTagName('span')[0]).toHaveTextContent(`${errorPrefixTranslation}:`)
  expect(getByText(testErrorText).getElementsByTagName('span')[0]).toHaveAttribute('class', 'govuk-visually-hidden')
})

it('HELPER makeHintId appends name with -hint', () => {
  const madeHint = makeHintId(testFormgroupName)

  expect(madeHint).toBe(`${testFormgroupName}-hint`)
})

it('HELPER makeErrorId appends name with -error', () => {
  const madeHint = makeErrorId(testFormgroupName)

  expect(madeHint).toBe(`${testFormgroupName}-error`)
})
