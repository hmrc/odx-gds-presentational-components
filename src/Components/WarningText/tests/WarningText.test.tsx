import React from 'react'
import { render, screen } from '@testing-library/react'
import { WarningText } from '../WarningText'
import { snapshotAndAxeTest } from '../../../testHelpers'
import '@testing-library/jest-dom'

const iconFallbackText = 'Warning'
const text = 'You can be fined up to £5,000 if you do not register.'

/****************
 * SNAPSHOTS AND AXE
 ****************/

snapshotAndAxeTest(
  'Default WarningText Component',
  <WarningText iconFallbackText={iconFallbackText} text={text} />
)

describe('Given I am using a GDS WarningText Component', () => {
  describe('When there is ! warning icon', () => {
    it('should check warning ! icon is present in the dom', () => {
      const icon = '!'
      render(<WarningText iconFallbackText={iconFallbackText} text={text} />)

      const iconImage = screen.getByText(icon)
      expect(iconImage).toBeInTheDocument()
    })

    it('should have the aria-hidden="true" attribute on the icon element', () => {
      const { container } = render(<WarningText iconFallbackText={iconFallbackText} text={text} />)
      const iconElement = container.querySelector('.govuk-warning-text__icon')
      expect(iconElement).toHaveAttribute('aria-hidden', 'true')
    })
  })
  describe('When I provide iconFallback text', () => {
    it('Should render the provided fallback text and it is hidden', () => {
      render(<WarningText iconFallbackText={iconFallbackText} text={text} />)
      const iconText = screen.getByText(iconFallbackText)
      expect(iconText).toHaveClass('govuk-visually-hidden')
    })
  })
  describe('When I provide Warning text', () => {
    it('should render the warning text correctly', () => {
      render(<WarningText iconFallbackText={iconFallbackText} text={text} />)

      const warningText = screen.getByText(text)
      expect(warningText).toBeInTheDocument()
    })
  })
})
