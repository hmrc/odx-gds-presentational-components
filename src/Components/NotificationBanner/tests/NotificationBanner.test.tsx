import React from 'react'
import { cleanup, render } from '@testing-library/react'
import { NotificationBanner } from '../NotificationBanner'
import { snapshotAndAxeTest } from '../../../testHelpers'
import { BannerTypes } from '../NotificationBanner.types'

/****************
 * SET UP
 ****************/
// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
afterEach(cleanup)
const testHeader = 'Important'
const testNeutralType = BannerTypes.neutral
const testSuccessType = BannerTypes.success
const testTextContent = 'text content'
const testBodyJSX = (
  <>
    <h3 className='govuk-notification-banner__heading'>
      Training outcome recorded and trainee withdrawn
    </h3>
    <p className='govuk-body'>
      Contact <a className='govuk-notification-banner__link' href='#'>example@department.gov.uk</a> if you think there’s a problem.
    </p>
  </>
)

/****************
 * SNAPHOTS AND AXE
 ****************/
snapshotAndAxeTest('Neutral notification banner', <NotificationBanner type={testNeutralType} header={testHeader}>{testBodyJSX}</NotificationBanner>)

snapshotAndAxeTest('Success notification banner', <NotificationBanner type={testSuccessType} header={testHeader}>{testBodyJSX}</NotificationBanner>)

/****************
 * ASSERTIONS
 ****************/
it('Should consist of header, content containers', () => {
  const { getByRole } = render(<NotificationBanner type={testNeutralType} header={testHeader}>{testTextContent}</NotificationBanner>)

  const fieldset = getByRole('region')
  const headerContainer = fieldset.getElementsByClassName('govuk-notification-banner__header')
  const contentContainer = fieldset.getElementsByClassName('govuk-notification-banner__content')

  expect(headerContainer).toBeTruthy()
  expect(contentContainer).toBeTruthy()
})

it('Should show the passed header as banner heading in h2 tag', () => {
  const { getByRole } = render(<NotificationBanner type={testNeutralType} header={testHeader}>{testBodyJSX}</NotificationBanner>)

  const fieldset = getByRole('region')

  expect(fieldset.getElementsByTagName('h2')).toBeTruthy()
  expect(fieldset.getElementsByTagName('h2')[0].textContent).toBe(testHeader)
})

it('Should role be alert when the type is success', () => {
  const { getByRole } = render(<NotificationBanner type={testSuccessType} header={testHeader}>{testBodyJSX}</NotificationBanner>)

  const fieldset = getByRole('alert')
  expect(fieldset).toBeInTheDocument()
})

it('Should show children as banner content', () => {
  const { getByRole } = render(<NotificationBanner type={testNeutralType} header={testHeader}>{testTextContent}</NotificationBanner>)

  const fieldset = getByRole('region')

  expect(fieldset.getElementsByClassName('govuk-notification-banner__content')[0].textContent).toBe(testTextContent)
})
