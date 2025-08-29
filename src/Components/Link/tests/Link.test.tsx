import React from 'react'
import { cleanup, fireEvent, render } from '@testing-library/react'
import { snapshotAndAxeTest } from '../../../testHelpers'
import { Link } from '..'
import '@testing-library/jest-dom'

/****************
 * SET UP
 ****************/
// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

const testLinkText = 'HTML Example'
const testHref = '#'

const expectedDefaultLinkClass = 'govuk-link'

/****************
 * SNAPHOTS
 ****************/

snapshotAndAxeTest('Default Link Snapshot', <Link href={testHref}>{testLinkText}</Link>)
snapshotAndAxeTest('Opens in New Tab Link Snapshot', <Link href={testHref} opensInNewTab>{testLinkText}</Link>)
snapshotAndAxeTest('Inverted Colour Link Snapshot', <Link href={testHref} invertColour>{testLinkText}</Link>)
snapshotAndAxeTest('Link with no underline Snapshot', <Link href={testHref} noUnderline>{testLinkText}</Link>)
snapshotAndAxeTest('Default Snapshot', <Link href={testHref}>{testLinkText}</Link>)

/****************
 * ASSERTIONS
 ****************/

describe('Link Styled Component', () => {
  describe('When provided with href and text', () => {
    it('should render an anchor element with href and text, with govuk style class', () => {
      const link = render(
        <Link href={testHref}>{testLinkText}</Link>
      ).getByRole('link')

      expect(link.className.split(' ')).toContain(expectedDefaultLinkClass)
    })
  })

  describe('When external link prop is true', () => {
    it('should render an anchor element with rel attribute set to \'noreferrer noopener\' and target attribute set to \'_blank\' ', () => {
      const link = render(
        <Link href={testHref} opensInNewTab>{testLinkText}</Link>
      ).getByRole('link')

      expect(link.getAttribute('rel')).toBe('noreferrer noopener')
      expect(link.getAttribute('target')).toBe('_blank')
    })
  })

  describe('When invert colour prop is true', () => {
    it('should render an anchor element with govuk-link--inverse class', () => {
      const link = render(
        <Link href={testHref} invertColour>{testLinkText}</Link>
      ).getByRole('link')

      expect(link.className.split(' ')).toContain('govuk-link--inverse')
    })
  })

  describe('When showVisitedState prop is false', () => {
    it('should render an anchor element with govuk-link--no-visited-state class', () => {
      const link = render(
        <Link href={testHref} showVisitedState={false}>{testLinkText}</Link>
      ).getByRole('link')

      expect(link.className.split(' ')).toContain('govuk-link--no-visited-state')
    })
  })

  describe('When noUnderline prop is true', () => {
    it('should render an anchor element with govuk-link--no-underline class', () => {
      const link = render(
        <Link href={testHref} noUnderline>{testLinkText}</Link>
      ).getByRole('link')

      expect(link.className.split(' ')).toContain('govuk-link--no-underline')
    })
  })

  describe('When an onClick handler is provided', () => {
    it('Should be called on click of the link element', () => {
      const mockOnClickHandler = jest.fn()
      const link = render(
        <Link href={testHref} onClick={mockOnClickHandler}>{testLinkText}</Link>
      ).getByRole('link')

      fireEvent.click(link)
      expect(mockOnClickHandler).toHaveBeenCalledTimes(1)
    })
  })
})
