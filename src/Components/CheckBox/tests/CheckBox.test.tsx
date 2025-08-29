import React from 'react'
import { cleanup, fireEvent, render } from '@testing-library/react'
import { snapshotAndAxeTest } from '../../../testHelpers'
import { CheckBox } from '..'
import '@testing-library/jest-dom'

/****************
 * SET UP
 ****************/
// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

const testLabel = 'Check Box Label'
const testValue = 'Check Box Value'
const testHintText = 'CheckBox Hint Text'
const testId = 'checkbox1'
const testChangeHandler = (): void => {}

const conditionalContentTestId = 'checkboxTestId'
const testConditionalContent = <div data-testid={conditionalContentTestId}><input aria-label='label' /></div>

/****************
 * SNAPHOTS
 ****************/
snapshotAndAxeTest('Default Check Box', <CheckBox id='check-box' name='check-box' value='yes' label='Yes' onChange={testChangeHandler} />)
snapshotAndAxeTest('Default Checked Check Box', <CheckBox id='check-box' name='check-box' value='yes' label='Yes' defaultChecked onChange={testChangeHandler} />)
snapshotAndAxeTest('Check Box with hint text', <CheckBox id='check-box' name='check-box' value='yes' label='Yes' hintText={testHintText} onChange={testChangeHandler} />)
snapshotAndAxeTest('Check Box with revealed conditional content',
  <CheckBox
    id='check-box'
    name='check-box'
    value='yes'
    label='Yes'
    defaultChecked
    conditionalContent={testConditionalContent}
    onChange={testChangeHandler}
  />
)
snapshotAndAxeTest('Checkbox with hint and revealed conditional content',
  <CheckBox
    id='check-box'
    name='check-box'
    value='yes'
    label='Yes'
    hintText={testHintText}
    defaultChecked
    conditionalContent={testConditionalContent}
    onChange={testChangeHandler}
  />
)

/****************
 * ASSERTIONS
 ****************/
it('Renders a check box input and label', () => {
  const { getByLabelText } = render(
    <CheckBox id={testId} name='check-box' value={testValue} label={testLabel} />
  )

  expect(getByLabelText(testLabel).attributes.getNamedItem('type')?.value).toBe('checkbox')
})

it('Renders hint text associated to the input, if hint text is provided', () => {
  const { getByRole } = render(
    <CheckBox id={testId} name='check-box' value={testValue} label={testLabel} hintText={testHintText} />
  )

  expect(getByRole('checkbox')
    .attributes.getNamedItem('aria-describedby')?.value).toContain(`${testId}-item-hint`)
})

it('Renders conditional content after the check box if the check box is checked and conditional content is provided', () => {
  const { queryByTestId } = render(
    <CheckBox id={testId} name='check-box' onChange={testChangeHandler} value={testValue} label={testLabel} conditionalContent={testConditionalContent} defaultChecked />
  )

  expect(queryByTestId(conditionalContentTestId)).toBeTruthy()
})

it('Does not render any content after the check box if the check box is not checked and conditional content is provided', () => {
  const { queryByTestId } = render(
    <CheckBox id={testId} name='check-box' value={testValue} label={testLabel} conditionalContent={testConditionalContent} />
  )

  expect(queryByTestId(conditionalContentTestId)).toBeFalsy()
})

it('If an onChange handler is provided, it is called when the check box is clicked', async () => {
  const mockChangeHandler = jest.fn()
  const { getByRole } = render(
    <CheckBox id={testId} name='check-box' value={testValue} label={testLabel} onChange={mockChangeHandler} />
  )

  // Click a first time, expect changeHandler not to be called, as check box should be 'changed' from unchecked to checked
  await fireEvent.click(getByRole('checkbox'))
  expect(mockChangeHandler).toHaveBeenCalledTimes(1)

  // Click a second time, expect changeHandler not to have been called, as check box should already be checked
  await fireEvent.click(getByRole('checkbox'))
  expect(mockChangeHandler).toHaveBeenCalledTimes(2)
})
