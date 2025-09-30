import React from 'react'
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react'
import { snapshotAndAxeTest } from '../../../testHelpers'
import { BackLink } from '../BackLink'
import '@testing-library/jest-dom'

/****************
 * SET UP
 ****************/

afterEach(cleanup)

const testText = 'Back'
const validHref = 'https://gov.uk'
const hashHref = '#'
const invalidHref = 'not-a-url'
const expectedClass = 'govuk-back-link'
const inverseClass = 'govuk-back-link--inverse'

/****************
 * SNAPSHOTS
 ****************/

snapshotAndAxeTest('Default BackLink Snapshot', <BackLink text={testText} href={validHref} />)
snapshotAndAxeTest('Inverse BackLink Snapshot', <BackLink text={testText} href={validHref} inverse />)
snapshotAndAxeTest('BackLink with onClick Snapshot', <BackLink text={testText} href={validHref} handleBackLink={() => {}} />)

/****************
 * ASSERTIONS
 ****************/

describe('Given a BackLink Component is used', () => {
  describe('When provided with valid href And text', () => {
    it('Then it render an anchor element with correct href and text', () => {
      const link = render(
        <BackLink text={testText} href={validHref} />
      ).getByRole('link')

      expect(link).toHaveAttribute('href', validHref + '/')
      expect(link).toHaveTextContent(testText)
      expect(link.className.split(' ')).toContain(expectedClass)
    })
  })

  describe('When provided with # as href', () => {
    it('Then it should render with # as href', () => {
      const link = render(
        <BackLink text={testText} href={hashHref} />
      ).getByRole('link')

      expect(link).toHaveAttribute('href', '#')
      expect(link).toHaveTextContent(testText)
      expect(link.className.split(' ')).toContain(expectedClass)
    })
  })

  describe('When inverse prop is true', () => {
    it('Then it include govuk-back-link--inverse class', () => {
      const link = render(
        <BackLink text={testText} href={validHref} inverse />
      ).getByRole('link')

      expect(link.className.split(' ')).toContain(inverseClass)
    })
  })

  describe('When handleBackLink is provided', () => {
    it('Then should call the handler on click', () => {
      const mockHandler = jest.fn()
      const link = render(
        <BackLink text={testText} href={validHref} handleBackLink={mockHandler} />
      ).getByRole('link')

      fireEvent.click(link)
      expect(mockHandler).toHaveBeenCalledTimes(1)
    })
  })

  describe('When href is invalid (not a URL)', () => {
    it('should throw an error during render', () => {
      const renderInvalid = (): RenderResult => render(<BackLink text={testText} href={invalidHref} />)
      expect(renderInvalid).toThrow(/Invalid URL provided/)
    })
  })

  describe('When href is undefined', () => {
    it('should default to "#" as fallback href', () => {
      const link = render(
        <BackLink text={testText} href={undefined as any} />
      ).getByRole('link')

      expect(link).toHaveAttribute('href', '#')
    })
  })

  describe('When provided with URL object as href', () => {
    it('Then it should render with the correct href string', () => {
      const urlObject = new URL('https://gov.uk')
      const link = render(
        <BackLink text={testText} href={urlObject} />
      ).getByRole('link')

      expect(link).toHaveAttribute('href', urlObject.toString())
      expect(link).toHaveTextContent(testText)
      expect(link.className.split(' ')).toContain(expectedClass)
    })
  })

  describe('When href is an empty string', () => {
    it('should throw an error during render', () => {
      const renderEmpty = (): RenderResult => render(<BackLink text={testText} href='' />)
      expect(renderEmpty).toThrow(/Invalid URL provided/)
    })
  })
})
