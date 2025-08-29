import React from 'react'
import { cleanup, render } from '@testing-library/react'
import { snapshotAndAxeTest } from '../../../testHelpers'
import { NotificationBadge } from '../NotificationBadge'
import '@testing-library/jest-dom'

/****************
 * SET UP
 ****************/
// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

/****************
 * SNAPHOTS
 ****************/

snapshotAndAxeTest('Notification Banner with count between 0 and 100', <NotificationBadge notificationCount={57} />)
snapshotAndAxeTest('Notification Banner with count of 0', <NotificationBadge notificationCount={0} />)
snapshotAndAxeTest('Notification Banner with count greater than 99', <NotificationBadge notificationCount={287} />)

/****************
 * ASSERTIONS
 ****************/

describe('Given: I am using the Notification Badge Component', () => {
  describe('When a notificationCount of 0 is provided', () => {
    it('Should not render anything', () => {
      expect(render(<NotificationBadge notificationCount={0} />).container).toBeEmptyDOMElement()
    })
  })

  describe.each([
    { value: 1, expectedDisplay: '1' },
    { value: 2, expectedDisplay: '2' },
    { value: 10, expectedDisplay: '10' },
    { value: 34, expectedDisplay: '34' },
    { value: 99, expectedDisplay: '99' },
    { value: 100, expectedDisplay: '99+' },
    { value: 368, expectedDisplay: '99+' }
  ])(
    'When notificationCount is $value', ({ value, expectedDisplay }) => {
      it(`Should render notification badge displaying ${expectedDisplay}`, () => {
        const notificationBadge = render(<NotificationBadge notificationCount={value} />).getByText(expectedDisplay)
        expect(notificationBadge).toHaveClass('hmrc-notification-badge')
      })
    }
  )
})
