import React from 'react'
import { cleanup, fireEvent, render } from '@testing-library/react'
import { snapshotAndAxeTest } from '../../../../testHelpers'
import { RadioButton } from '..'
import '@testing-library/jest-dom'

/****************
 * SET UP
 ****************/
// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

const testLabel = 'Radio Button Label'
const testValue = 'Radio Button Value'
const testHintText = 'Radiobutton Hint Text'

const conditionalContentTestId = 'radiobuttonTestId'
const testConditionalContent = <div data-testid={conditionalContentTestId}><input aria-label='label' /></div>

/****************
 * SNAPHOTS
 ****************/
snapshotAndAxeTest('Default Radio button', <RadioButton id='radio-button' name='radio-button' value='yes' label='Yes' />)
snapshotAndAxeTest('Default Checked Radio button', <RadioButton id='radio-button' name='radio-button' value='yes' label='Yes' defaultChecked />)
snapshotAndAxeTest('Radio button with hint text', <RadioButton id='radio-button' name='radio-button' value='yes' label='Yes' hintText={testHintText} />)
snapshotAndAxeTest('Radio button with revealed conditional content',
  <RadioButton
    id='radio-button'
    name='radio-button'
    value='yes'
    label='Yes'
    defaultChecked
    conditionalContent={testConditionalContent}
  />
)
snapshotAndAxeTest('Radio button with hint and revealed conditional content',
  <RadioButton
    id='radio-button'
    name='radio-button'
    value='yes'
    label='Yes'
    hintText={testHintText}
    defaultChecked
    conditionalContent={testConditionalContent}
  />
)

/****************
 * ASSERTIONS
 ****************/
it('Renders a radio button input and label', () => {
  const { getByLabelText } = render(
    <RadioButton id='radio-button' name='radio-button' value={testValue} label={testLabel} />
  )

  expect(getByLabelText(testLabel).attributes.getNamedItem('type')?.value).toBe('radio')
})

it('Renders hint text associated to the input, if hint text is provided', () => {
  const { getByText, getByRole } = render(
    <RadioButton id='radio-button' name='radio-button' value={testValue} label={testLabel} hintText={testHintText} />
  )

  expect(getByText(testHintText).attributes.getNamedItem('id')?.value).toBe(getByRole('radio').attributes.getNamedItem('aria-describedby')?.value)
})

it('Renders conditional content after the radio button if the radio button is checked and conditional content is provided', () => {
  const { queryByTestId } = render(
    <RadioButton id='radio-button' name='radio-button' value={testValue} label={testLabel} conditionalContent={testConditionalContent} defaultChecked />
  )

  expect(queryByTestId(conditionalContentTestId)).toBeTruthy()
})

it('Does not render any content after the radio button if the radio button is not checked and conditional content is provided', () => {
  const { queryByTestId } = render(
    <RadioButton id='radio-button' name='radio-button' value={testValue} label={testLabel} conditionalContent={testConditionalContent} />
  )

  expect(queryByTestId(conditionalContentTestId)).toBeFalsy()
})

it('If an onChange handler is provided, it is called when the radio button is clicked and it becomes checked', async () => {
  const mockChangeHandler = jest.fn()
  const { getByRole } = render(
    <RadioButton id='radio-button' name='radio-button' value={testValue} label={testLabel} onChange={mockChangeHandler} />
  )

  // Click a first time, expect changeHandler not to be called, as radio button should be 'changed' from unchecked to checked
  await fireEvent.click(getByRole('radio'))
  expect(mockChangeHandler).toHaveBeenCalledTimes(1)

  // Click a second time, expect changeHandler not to have been called, as radio button should already be checked
  await fireEvent.click(getByRole('radio'))
  expect(mockChangeHandler).toHaveBeenCalledTimes(1)
})
