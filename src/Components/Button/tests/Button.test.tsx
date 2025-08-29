import React from 'react'
import { cleanup, fireEvent, render } from '@testing-library/react'
import { Button } from '../Button'
import { snapshotAndAxeTest } from '../../../testHelpers'
import { ButtonVariant } from '../ButtonVariant'

/****************
 * SET UP
 ****************/
// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
afterEach(cleanup)
const testText = 'Click me'
const testClickHandler = jest.fn(() => { })

const testDefaults = {
  text: testText,
  onClick: testClickHandler
}

/****************
 * SNAPSHOTS AND AXE
 ****************/
snapshotAndAxeTest(
  'Default button Component',
  <Button text={testText} onClick={testClickHandler} />
)
snapshotAndAxeTest(
  'Secondary button Component',
  <Button text={testText} onClick={testClickHandler} variant={ButtonVariant.Secondary} />
)
snapshotAndAxeTest(
  'Inverse button Component',
  <Button text={testText} onClick={testClickHandler} variant={ButtonVariant.Inverse} />
)
snapshotAndAxeTest(
  'Warning button Component',
  <Button text={testText} onClick={testClickHandler} variant={ButtonVariant.Warning} />
)
snapshotAndAxeTest(
  'Disabled button Component',
  <Button text={testText} onClick={testClickHandler} disabled />
)

/****************
 * ASSERTIONS
 *
 * notes:
 *  -'cut' is used as a short hand for Component Under Test, a variant of the common shorthand 'sut' (system under test)
 *  - Where JSX is written this is interchangeable with TSX
 *  - Tests use the gherkin language to help organise and describe the tests
 ****************/

describe('Given I am using a GDS button', () => {
  describe('When a button is NOT supplied with a variation value', () => {
    it("Should NOT contain variation classes in the element's classes", () => {
      const variationClasses = [
        'govuk-button--secondary',
        'govuk-button--start',
        'govuk-button--warning'
      ]

      const cut = render(<Button {...testDefaults} />).getByRole('button')

      variationClasses.forEach((varClass) => {
        expect(cut.className).not.toContain(varClass)
      })
    })
  })

  describe.each([
    { value: ButtonVariant.Secondary, cssClass: 'govuk-button--secondary' },
    { value: ButtonVariant.Inverse, cssClass: 'govuk-button--inverse' },
    { value: ButtonVariant.Warning, cssClass: 'govuk-button--warning' }
  ])(
    'When a button is supplied with a variation value $value',
    ({ value, cssClass }) => {
      it(`Should contain ${cssClass} in the element classes`, () => {
        const cut = render(<Button {...testDefaults} variant={value} />).getByRole('button')
        expect(cut.className).toContain(cssClass)
      })
    }
  )

  describe('When a button is NOT configured to be used on a dark background', () => {
    it("Should NOT contain the inverse class in the element's classes", () => {
      const cut = render(<Button {...testDefaults} />).getByRole('button')
      expect(cut.className).not.toContain('govuk-button--inverse')
    })
  })

  describe('When the button is disabled', () => {
    it('Should render button with disabled and aria-disabled attributes as true', () => {
      const cut = render(<Button {...testDefaults} disabled />).getByRole('button')
      expect(cut.attributes.getNamedItem('disabled')).toBeTruthy()
      expect(cut.attributes.getNamedItem('aria-disabled')).toBeTruthy()
    })
  })

  describe('When clicking the button', () => {
    it('Should call the provided onClick handler', () => {
      const mockClickHandler = jest.fn()
      const cut = render(<Button {...testDefaults} onClick={mockClickHandler} />).getByRole('button')

      fireEvent.click(cut)

      expect(mockClickHandler).toHaveBeenCalledTimes(1)
    })
  })
})
