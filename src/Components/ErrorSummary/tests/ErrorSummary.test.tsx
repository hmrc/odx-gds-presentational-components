import React from 'react'
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react'
import { snapshotAndAxeTest } from '../../../testHelpers'
import { ErrorSummary } from '../'
import '@testing-library/jest-dom'

/****************
 * SET UP
 ****************/
// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

const testErrorsListWithOne = [{ message: 'An error message', targetFieldId: 'fieldA' }]
const testErrorsListWithThree = [
  { message: 'An error message', targetFieldId: 'fieldA' },
  { message: 'Date should be in future', targetFieldId: 'fieldB' },
  { message: 'Value should match pattern X1 X1', targetFieldId: 'fieldC' }
]
const testHeading = 'Test Heading for Error Summary'

/****************
 * SNAPHOTS
 ****************/

snapshotAndAxeTest('Default Error summary with one error', <ErrorSummary errorDetails={testErrorsListWithOne} />)
snapshotAndAxeTest('Default Error summary with multple errors', <ErrorSummary errorDetails={testErrorsListWithThree} />)
snapshotAndAxeTest('Error summary with custom heading', <ErrorSummary errorDetails={testErrorsListWithThree} heading='Custom Heading' />)
snapshotAndAxeTest('ErrorSummary with autoMoveFocus set to false', <ErrorSummary errorDetails={testErrorsListWithThree} autoMoveFocus={false} />)
snapshotAndAxeTest('ErrorSummary with empty error details list passed', <ErrorSummary errorDetails={[]} />)

/****************
 * ASSERTIONS
 ****************/
it('Error Summary should render list with one item, if list of one error passed', () => {
  const { getAllByRole } = render(<ErrorSummary errorDetails={testErrorsListWithOne} />)

  expect(getAllByRole('listitem').length).toBe(1)
})

it('Error Summary should render list with as many items as there are errors passed', () => {
  const { getAllByRole } = render(<ErrorSummary errorDetails={testErrorsListWithThree} />)

  expect(getAllByRole('listitem').length).toBe(3)
})

it('Each error summary list item should be a link with text equal to passed message, and href equal to passed targetFieldId', () => {
  const { getAllByRole } = render(<ErrorSummary errorDetails={testErrorsListWithThree} />)

  expect(getAllByRole('listitem')[0].textContent).toBe(testErrorsListWithThree[0].message)
  expect(getAllByRole('listitem')[0].firstElementChild?.tagName).toBe('A')
  expect(getAllByRole('listitem')[0].firstElementChild?.getAttribute('href')).toBe(`#${testErrorsListWithThree[0].targetFieldId}`)

  expect(getAllByRole('listitem')[1].textContent).toBe(testErrorsListWithThree[1].message)
  expect(getAllByRole('listitem')[1].firstElementChild?.tagName).toBe('A')
  expect(getAllByRole('listitem')[1].firstElementChild?.getAttribute('href')).toBe(`#${testErrorsListWithThree[1].targetFieldId}`)

  expect(getAllByRole('listitem')[2].textContent).toBe(testErrorsListWithThree[2].message)
  expect(getAllByRole('listitem')[2].firstElementChild?.tagName).toBe('A')
  expect(getAllByRole('listitem')[2].firstElementChild?.getAttribute('href')).toBe(`#${testErrorsListWithThree[2].targetFieldId}`)
})

it('Each error summary list item should move focus to the element with an id that matches the targetFieldId, if such an element exists', () => {
  const screen = render(
    <>
      <ErrorSummary errorDetails={testErrorsListWithThree} />
      <input id={testErrorsListWithThree[0].targetFieldId} />
      <input id={testErrorsListWithThree[2].targetFieldId} />
    </>
  )
  const { getAllByRole } = screen

  const errorLinkA = getAllByRole('link')[0]
  const errorLinkC = getAllByRole('link')[2]

  fireEvent.click(errorLinkA)
  expect(getAllByRole('textbox')[0]).toHaveFocus()

  fireEvent.click(errorLinkC)
  expect(getAllByRole('textbox')[1]).toHaveFocus()
})

it('If an errors targetFieldId doesn\'t match any elements in the document, focus does not move when clicking that message', async () => {
  const { getAllByRole } = render(<ErrorSummary errorDetails={testErrorsListWithOne} />)

  const initalActiveElement = document.activeElement
  fireEvent.click(getAllByRole('link')[0])

  await waitFor(() => expect(document.activeElement).toEqual(initalActiveElement))
})

it('Defaults Error summary heading to be \'There is a problem\'', () => {
  const { getByRole } = render(<ErrorSummary errorDetails={testErrorsListWithThree} />)

  expect(getByRole('heading').textContent).toBe('There is a problem')
})

it('If a custom heading is provided, the Error Summary heading shows this ', () => {
  const { getByRole } = render(<ErrorSummary errorDetails={testErrorsListWithThree} heading={testHeading} />)

  expect(getByRole('heading').textContent).toBe(testHeading)
})

it('By default, when rendered, the Error Summary component takes focus', async () => {
  const { container } = render(
    <>
      <input id={testErrorsListWithThree[0].targetFieldId} />
      <input id={testErrorsListWithThree[2].targetFieldId} />
      <ErrorSummary errorDetails={testErrorsListWithThree} />
    </>
  )

  await waitFor(() => expect(document.activeElement).toBe(container.getElementsByClassName('govuk-error-summary')[0]))
})

it('If autoMoveFocus is set to false, the Error Summary component does not take focus when rendered', async () => {
  const { container } = render(
    <>
      <input id={testErrorsListWithThree[0].targetFieldId} />
      <input id={testErrorsListWithThree[2].targetFieldId} />
      <ErrorSummary errorDetails={testErrorsListWithThree} autoMoveFocus={false} />
    </>
  )

  await waitFor(() => expect(document.activeElement).not.toBe(container.getElementsByClassName('govuk-error-summary')[0]))
})
