import React from 'react'
import { cleanup, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { FieldSet } from '../FieldSet'
import { snapshotAndAxeTest } from '../../../testHelpers'

/****************
 * SET UP
 ****************/
// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
afterEach(cleanup)
const testFieldsetLabel = 'Test Label'
const testFieldsetName = 'FieldsetName'
const testHintText = 'hint text'
const testErrorText = 'Something is wrong'

const formGroupInnerChildTestId = 'formgroup-inner-test'
const testInnerInput = (
  <>
    {[1, 2, 3].map((item) => {
      return (
        <React.Fragment key={item}>
          <label htmlFor={`testInputId_${item}`}>{`testInputLabel_${item}`}</label>
          <input className='fieldsetTest' data-testid={`${formGroupInnerChildTestId}_${item}`} id={`testInputId_${item}`} />
        </React.Fragment>
      )
    })}
  </>
)

/****************
 * SNAPHOTS AND AXE
 ****************/
snapshotAndAxeTest('Default fieldset', <FieldSet label={testFieldsetLabel} name={testFieldsetName}>{testInnerInput}</FieldSet>)
snapshotAndAxeTest('LegendIsHeading is false', <FieldSet label={testFieldsetLabel} name={testFieldsetName} legendIsHeading={false}>{testInnerInput}</FieldSet>)
snapshotAndAxeTest('Fieldset with errorText', <FieldSet label={testFieldsetLabel} name={testFieldsetName} errorText={testErrorText}>{testInnerInput}</FieldSet>)
snapshotAndAxeTest('Fieldset with hintText', <FieldSet label={testFieldsetLabel} name={testFieldsetName} hintText={testHintText}>{testInnerInput}</FieldSet>)
snapshotAndAxeTest('Fieldset with hintText and errorText', <FieldSet label={testFieldsetLabel} name={testFieldsetName} hintText={testHintText} errorText={testErrorText}>{testInnerInput}</FieldSet>)

/****************
 * ASSERTIONS
 ****************/
it('first element should be a legend', () => {
  const { getByRole } = render(<FieldSet label={testFieldsetLabel} name={testFieldsetName} />)

  expect(getByRole('group').firstElementChild?.tagName).toBe('LEGEND')
})

it('By default content of legend is set as page heading', () => {
  const { container } = render(<FieldSet label={testFieldsetLabel} name={testFieldsetName} />)

  expect(container.getElementsByTagName('Legend')[0]?.firstElementChild?.tagName).toBe('H1')
})

it('Legend is not set as page heading, is legendIsHeading is false', () => {
  const { container } = render(<FieldSet label={testFieldsetLabel} name={testFieldsetName} legendIsHeading={false} />)

  expect(container.getElementsByTagName('Legend')[0].firstElementChild?.tagName).not.toBe('H1')
})

it('Renders hint text, if provided, with hint class and hint id based on formgroup name', () => {
  const customHint = <div id={`${testFieldsetName}-hint`} className='govuk-hint' data-testid='custom-hint'>Custom hint</div>
  const { getByTestId, getByRole } = render(
    <FieldSet label={testFieldsetLabel} name={testFieldsetName} hintText={customHint}>
      {testInnerInput}
    </FieldSet>
  )
  const hintElement = getByTestId('custom-hint')
  expect(hintElement).toHaveClass('govuk-hint')
  expect(hintElement).toHaveAttribute('id', `${testFieldsetName}-hint`)
  expect(getByRole('group')).toHaveAttribute('aria-describedby', `${testFieldsetName}-hint`)
})

it('Renders error text, if provided, with error class and error id based on formgroup name', () => {
  const { getByText, getByRole } = render(
    <FieldSet label={testFieldsetLabel} name={testFieldsetName} errorText={testErrorText}>{testInnerInput}</FieldSet>
  )

  const expectedErrorId = `${testFieldsetName}-error`

  expect(getByText(testErrorText)).toHaveAttribute('class', 'govuk-error-message')
  expect(getByText(testErrorText)).toHaveAttribute('id', expectedErrorId)
  expect(getByRole('group')).toHaveAttribute('aria-describedby', expectedErrorId)
})

it('Prefixes error text, if provided, with hidden Error prefix for screen readers', () => {
  const { getByText } = render(
    <FieldSet label={testFieldsetLabel} name={testFieldsetName} errorText={testErrorText}>{testInnerInput}</FieldSet>
  )

  expect(getByText(testErrorText).getElementsByTagName('span')).toHaveLength(1)
  expect(getByText(testErrorText).getElementsByTagName('span')[0]).toHaveTextContent('Error:')
  expect(getByText(testErrorText).getElementsByTagName('span')[0]).toHaveAttribute('class', 'govuk-visually-hidden')
})

it('Children are wrapped within the fieldset ', () => {
  const { getByRole } = render(
    <FieldSet label={testFieldsetLabel} name={testFieldsetName} errorText={testErrorText}>{testInnerInput}</FieldSet>
  )

  expect(getByRole('group').getElementsByClassName('fieldsetTest')).toHaveLength(3)
})

it('Renders provided legend context, after the label, within the legend', () => {
  const testLegendContentText = 'Some Legend Help Content here'
  const testLegendContent = <div className='govuk-body'>{testLegendContentText}</div>
  const { getByRole } = render(
    <FieldSet
      label={testFieldsetLabel}
      name={testFieldsetName}
      errorText={testErrorText}
      legendContent={testLegendContent}
    >{testInnerInput}
    </FieldSet>
  )

  const legendContent = getByRole('group').childNodes.item(0).childNodes

  expect(legendContent.item(0).textContent).toBe(testFieldsetLabel)
  expect(legendContent.item(1).textContent).toBe(testLegendContentText)
  expect(legendContent.item(1).nodeName).toBe('DIV')
})
