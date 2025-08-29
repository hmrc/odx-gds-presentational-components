import React from 'react'
import { cleanup, fireEvent, render } from '@testing-library/react'
import { snapshotAndAxeTest } from '../../../testHelpers'
import CookieBanner from '../CookieBanner'
import '@testing-library/jest-dom'

/****************
 * SET UP
 ****************/
// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

const mockAccept = jest.fn(() => { })
const mockReject = jest.fn(() => { })
const cookieProps = {
  serviceName: 'cookie test',
  standardDescription: <p data-testid='standard description' className='govuk-body'>generic cookies description</p>,
  acceptedDescription: <p data-testid='accepted description' className='govuk-body'>you have accepted cookies</p>,
  rejectedDescription: <p data-testid='rejected description' className='govuk-body'>you have rejected cookies</p>,
  acceptedHandler: mockAccept,
  rejectedHandler: mockReject,
  acceptButtonText: 'Accept cookies',
  rejectButtonText: 'Reject cookies',
  cookieLink: 'test link'
}

/****************
 * SNAPHOTS
 ****************/

snapshotAndAxeTest(
  'Default Cookie Banner',
  <CookieBanner {...cookieProps} />
)

/****************
 * ASSERTIONS
 ****************/

describe('Feature: Cookie Banner', () => {
  describe('When the user has not completed an action', () => {
    // header
    it('Should render a h2 that matches the serviceName prop', () => {
      const cookieBanner = render(<CookieBanner {...cookieProps} />)
      const header = cookieBanner.container.getElementsByTagName('h2')[0]
      expect(header).toBeTruthy()
      const headerText = header.innerHTML
      expect(headerText).toBe('Cookies on ' + cookieProps.serviceName)
    })

    // description
    it('Should render a description that matches the standardDescription prop', () => {
      const cookieBanner = render(<CookieBanner {...cookieProps} />)
      const description = cookieBanner.queryByTestId('standard description')
      expect(description).toBeTruthy()
    })

    // view cookies href
    it('Should render an <a> with href that matches the cookieLink prop', () => {
      const cookieBanner = render(<CookieBanner {...cookieProps} />)
      const anchors = cookieBanner.container.getElementsByTagName('a')
      const anchor = [...anchors].find(a => a.getAttribute('href') === cookieProps.cookieLink)
      expect(anchor).toBeTruthy()
    })

    // accept button text
    it('Should render a <button> with text that matches the acceptButtonText prop', () => {
      const cookieBanner = render(<CookieBanner {...cookieProps} />)
      const acceptButton = cookieBanner.container.getElementsByTagName('button')[0]
      expect(acceptButton).toBeTruthy()
      const acceptButtonText = acceptButton.innerHTML
      expect(acceptButtonText).toBe(cookieProps.acceptButtonText)
    })

    // reject button text
    it('Should render a <button> with text that matches the rejectButton prop', () => {
      const cookieBanner = render(<CookieBanner {...cookieProps} />)
      const rejectButton = cookieBanner.container.getElementsByTagName('button')[1]
      expect(rejectButton).toBeTruthy()
      const rejectButtonText = rejectButton.innerHTML
      expect(rejectButtonText).toBe(cookieProps.rejectButtonText)
    })

    // accept button handler runs
    it('accept button should run a function when clicked', () => {
      const cookieBanner = render(<CookieBanner {...cookieProps} />)
      const acceptButton = cookieBanner.container.getElementsByTagName('button')[0]
      fireEvent.click(acceptButton)
      expect(mockAccept).toHaveBeenCalledTimes(1)
    })

    // reject button handler runs
    it('reject button should run a function when clicked', () => {
      const cookieBanner = render(<CookieBanner {...cookieProps} />)
      const rejectButton = cookieBanner.container.getElementsByTagName('button')[1]
      fireEvent.click(rejectButton)
      expect(mockReject).toHaveBeenCalledTimes(1)
    })
  })

  describe('When the user has accepted cookies', () => {
    // description
    it('has a description that matches the acceptedDescription prop', () => {
      const cookieBanner = render(<CookieBanner {...cookieProps} />)
      const acceptButton = cookieBanner.container.getElementsByTagName('button')[0]
      fireEvent.click(acceptButton)

      const description = cookieBanner.queryByTestId('accepted description')
      expect(description).toBeTruthy()

      const standardDescription = cookieBanner.queryByTestId('standard description')
      expect(standardDescription).toBeFalsy()
    })

    // hide cookies button
    it('has a hide cookies button', () => {
      const cookieBanner = render(<CookieBanner {...cookieProps} />)
      const acceptButton = cookieBanner.container.getElementsByTagName('button')[0]
      fireEvent.click(acceptButton)

      const hideButton = cookieBanner.container.querySelector('[name="cookies[hide]"]')
      expect(hideButton).toBeTruthy()
    })
  })

  describe('When the user has rejected cookies', () => {
    // description
    it('has a description that matches the rejectedDescription prop', () => {
      const cookieBanner = render(<CookieBanner {...cookieProps} />)
      const rejectButton = cookieBanner.container.getElementsByTagName('button')[1]
      fireEvent.click(rejectButton)

      const description = cookieBanner.queryByTestId('rejected description')
      expect(description).toBeTruthy()

      const standardDescription = cookieBanner.queryByTestId('standard description')
      expect(standardDescription).toBeFalsy()
    })

    // hide cookies button
    it('has a hide cookies button', () => {
      const cookieBanner = render(<CookieBanner {...cookieProps} />)
      const rejectButton = cookieBanner.container.getElementsByTagName('button')[1]
      fireEvent.click(rejectButton)

      const hideButton = cookieBanner.container.querySelector('[name="cookies[hide]"]')
      expect(hideButton).toBeTruthy()
    })
  })

  describe('When the user has hidden the cookie banner', () => {
    // no element rendered
    it('should not render anything', () => {
      const cookieBanner = render(<CookieBanner {...cookieProps} />)
      const rejectButton = cookieBanner.container.getElementsByTagName('button')[1]
      fireEvent.click(rejectButton)

      const hideButton = cookieBanner.container.getElementsByTagName('button')[0]
      fireEvent.click(hideButton)

      expect(cookieBanner.container).toBeEmptyDOMElement()
    })
  })
})
