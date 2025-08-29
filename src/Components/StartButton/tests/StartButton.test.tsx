import React from 'react'
import { cleanup, fireEvent, render } from '@testing-library/react'
import { snapshotAndAxeTest } from '../../../testHelpers'
import { StartButton } from '../StartButton'
import '@testing-library/jest-dom'

/****************
 * SET UP
 ****************/
// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
afterEach(cleanup)
const testHref = '#'
const testCustomText = 'Begin now'

/****************
 * SNAPHOTS
 ****************/

snapshotAndAxeTest(
  'Default Start Button',
  <StartButton href='/testurl' />
)

snapshotAndAxeTest(
  'Start Button with default text',
  <StartButton text='Begin a new claim' href='/testurl' />
)

/****************
 * ASSERTIONS
 ****************/

describe('Feature: Start Button', () =>
  describe('Given I am using the Start Button', () => {
    describe('When text property is not provided', () => {
      it('Should render with default `Start now` text', () => {
        const link = render(<StartButton href={testHref} />).getByRole('button')
        expect(link.textContent).toBe('Start now')
      })
    })

    describe('When text property is provided', () => {
      it('Should render with provided text', () => {
        const link = render(<StartButton href={testHref} text={testCustomText} />).getByRole('button')
        expect(link.textContent).toBe(testCustomText)
      })
    })

    it('Should set a tag href attribute to the provided href', () => {
      const link = render(<StartButton href={testHref} />).getByRole('button')

      expect(link).toHaveAttribute('href', testHref)
    })

    describe('When an onClick handler is passed', () => {
      const mockOnClick = jest.fn()
      it('Should be called when the button is clicked', () => {
        const link = render(<StartButton href={testHref} text={testCustomText} onClick={mockOnClick} />).getByRole('button')

        fireEvent.click(link)
        expect(mockOnClick).toHaveBeenCalled()
      })
    })
})
)
