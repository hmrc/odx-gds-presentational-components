import React, { MouseEvent } from 'react'
import { cleanup, render } from '@testing-library/react'
import { snapshotAndAxeTest } from '../../../../testHelpers'
import { SummaryListRow } from '../SummaryListRow'
import '@testing-library/jest-dom'

/****************
 * SET UP
 ****************/
// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
afterEach(cleanup)
const testRowKey = 'Row Key'
const testRowValue = 'Row Value'
const testActionClickHandler = (event: MouseEvent): any => {}

/****************
 * SNAPHOTS
 ****************/

snapshotAndAxeTest('Default summary list row',
  // Wrapped in dl as this is expected for this element
  <dl><SummaryListRow label={testRowKey} value={testRowValue} /></dl>
)

snapshotAndAxeTest('Summary list row with one action',
  // Wrapped in dl as this is expected for this element
  <dl><SummaryListRow
    label={testRowKey} value={testRowValue} actions={[
      {
        content: 'Change',
        handleClick: testActionClickHandler
      }
    ]}
      />
  </dl>
)

snapshotAndAxeTest('Default summary list row with multiple actions',
  // Wrapped in dl as this is expected for this element
  <dl><SummaryListRow
    label={testRowKey} value={testRowValue} actions={[
      {
        content: 'Change',
        handleClick: testActionClickHandler
      },
      {
        content: 'Delete',
        handleClick: testActionClickHandler
      }
    ]}
      />
  </dl>
)

snapshotAndAxeTest('Default summary list row with one action and extra link attributes',
  // Wrapped in dl as this is expected for this element
  <dl><SummaryListRow
    label={testRowKey} value={testRowValue} actions={[
      {
        content: 'Change',
        handleClick: testActionClickHandler,
        linkAttributes: { 'data-test-id': 'link' }
      }
    ]}
      />
  </dl>
)

snapshotAndAxeTest('Default summary list row with multiple actions and extra link attributes',
  // Wrapped in dl as this is expected for this element
  <dl><SummaryListRow
    label={testRowKey} value={testRowValue} actions={[
      {
        content: 'Change',
        handleClick: testActionClickHandler,
        linkAttributes: { 'data-test-id': 'changelink' }
      },
      {
        content: 'Delete',
        handleClick: testActionClickHandler,
        linkAttributes: { 'data-test-id': 'deletelink' }
      }
    ]}
      />
  </dl>
)

/****************
 * ASSERTIONS
 ****************/

it('row shows a key in a dt and a value in a dd', () => {
  const { getByText } = render(
    <SummaryListRow label={testRowKey} value={testRowValue} />
  )

  expect(getByText(testRowKey).tagName).toBe('DT')
  expect(getByText(testRowValue).tagName).toBe('DD')
})

it('accepts jsx as value (to allow for multi line values for example)', () => {
  const testValue = <>Address Line 1<br />Address Line 2<br />PostCode</>
  const { container } = render(
    <SummaryListRow label={testRowKey} value={testValue} />
  )

  expect(container.getElementsByTagName('dd')).toHaveLength(1)
  expect(container.getElementsByTagName('dd')[0].innerHTML).toBe(render(testValue).container.innerHTML)
})

it('renders a row action if an action is provided', () => {
  const actionContent = 'Change'
  const action = jest.fn()
  const actionProps = { content: actionContent, handleClick: action }

  const { container } = render(
    <SummaryListRow label={testRowKey} value={testRowValue} actions={[actionProps]} />
  )

  const actionLinkElements = container.getElementsByClassName('govuk-summary-list__actions')
  expect(actionLinkElements).toHaveLength(1)
  const actionLink = actionLinkElements[0]
  expect(actionLink.textContent).toBe(actionContent)
})

it('renders a list of row actions if multiple actions are provided', () => {
  const changeActionContent = 'Change'
  const changeAction = jest.fn()
  const changeActionProps = { content: changeActionContent, handleClick: changeAction }

  const addActionContent = 'Add'
  const addAction = jest.fn()
  const addActionProps = { content: addActionContent, handleClick: addAction }

  const { container } = render(
    <SummaryListRow label={testRowKey} value={testRowValue} actions={[changeActionProps, addActionProps]} />
  )

  // Expect actions dd to exist
  const actionLinkDDElements = container.getElementsByClassName('govuk-summary-list__actions')
  expect(actionLinkDDElements).toHaveLength(1)

  // Expect first element of the dd to be an unordered list, with 2 children (list items)
  const actionLinkList = actionLinkDDElements[0].firstElementChild
  expect(actionLinkList?.tagName).toBe('UL')
  expect(actionLinkList?.childNodes).toHaveLength(2)

  // Expect content of each item to be what was passed, in the order passed
  expect(actionLinkList?.childNodes[0].textContent).toBe(changeActionContent)
  expect(actionLinkList?.childNodes[1].textContent).toBe(addActionContent)
})

it('a row action can accept and render JSX and its content (allowing for hidden text, for example) ', () => {
  const actionContent = <>'Change'<span className='govuk-visually-hidden'> name</span></>
  const action = jest.fn()
  const actionProps = { content: actionContent, handleClick: action }

  const { container } = render(
    <SummaryListRow label={testRowKey} value={testRowValue} actions={[actionProps]} />
  )

  const actionLinkElements = container.getElementsByClassName('govuk-summary-list__actions')
  expect(actionLinkElements).toHaveLength(1)

  const actionLink = actionLinkElements[0]
  expect(actionLink.getElementsByTagName('A')[0].innerHTML).toBe(render(actionContent).container.innerHTML)
})

it('passes input attributes through to action link, if provided', () => {
  const testAttributeName = 'data-info'
  const testAttributeValue = 'info'
  const actionProps = { content: 'change', handleClick: testActionClickHandler, linkAttributes: { [testAttributeName]: testAttributeValue } }
  const { container } = render(
    <SummaryListRow label={testRowKey} value={testRowValue} actions={[actionProps]} />
  )

  const actionLinkElement = container.getElementsByClassName('govuk-summary-list__actions')[0].getElementsByTagName('A')[0]
  expect(actionLinkElement.attributes.getNamedItem(testAttributeName)?.value).toBe(testAttributeValue)
})
