import React from 'react'
import { cleanup, render } from '@testing-library/react'
import { Tag } from '../Tag'
import { snapshotAndAxeTest } from '../../../testHelpers'
import { TagColour } from '../TagColour'

/****************
 * SET UP
 ****************/
// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
afterEach(cleanup)
const testText = 'Tag, your it'
const testColour = TagColour.Green

const testDefaults = {
  text: testText,
  colour: testColour
}

/****************
 * SNAPSHOTS AND AXE
 ****************/
snapshotAndAxeTest(
  'Default Tag Component',
  <Tag text={testText} />
)
snapshotAndAxeTest(
  'Tag Component with colour',
  <Tag text={testText} colour={testColour} />
)

/****************
 * ASSERTIONS
 *
 * notes:
 *  -'cut' is used as a short hand for Component Under Test, a variant of the common shorthand 'sut' (system under test)
 *  - Where JSX is written this is interchangeable with TSX
 *  - Tests use the gherkin language to help organise and describe the tests
 ****************/

describe('Given I am using a GDS Tag', () => {
  const coloursForTest = [
    {
      enum: TagColour.Grey,
      css: 'govuk-tag--grey',
      name: 'grey'
    },
    {
      enum: TagColour.Green,
      css: 'govuk-tag--green',
      name: 'green'
    },
    {
      enum: TagColour.Turquoise,
      css: 'govuk-tag--turquoise',
      name: 'turquoise'
    },
    {
      enum: TagColour.Blue,
      css: 'govuk-tag--blue',
      name: 'blue'
    },
    {
      enum: TagColour.LightBlue,
      css: 'govuk-tag--light-blue',
      name: 'light-blue'
    },
    {
      enum: TagColour.Purple,
      css: 'govuk-tag--purple',
      name: 'purple'
    },
    {
      enum: TagColour.Pink,
      css: 'govuk-tag--pink',
      name: 'pink'
    },
    {
      enum: TagColour.Red,
      css: 'govuk-tag--red',
      name: 'red'
    },
    {
      enum: TagColour.Orange,
      css: 'govuk-tag--orange',
      name: 'orange'
    },
    {
      enum: TagColour.Yellow,
      css: 'govuk-tag--yellow',
      name: 'yellow'
    },
    {
      enum: TagColour.Default,
      css: 'govuk-tag--blue',
      name: 'default'
    }]

  describe('When a Tag is NOT supplied with a colour value', () => {
    it("Should contain the default colour class in the element's classes", () => {
      const colourClasses = coloursForTest.map(colourMeta => colourMeta.css)
      const defaultCSS = coloursForTest.filter(colourMeta => colourMeta.name === 'default')[0].css
      const cut = render(<Tag text={testDefaults.text} />).getByText(testDefaults.text)

      colourClasses.forEach((colourClass) => {
        expect(cut.className).toContain(defaultCSS)
      })
    })
  })

  describe.each(coloursForTest)(
    'When a Tag is supplied with a colour value $value',
    (testColour) => {
      it(`Should contain ${testColour.css} in the element classes`, () => {
        const cut = render(<Tag {...testDefaults} colour={testColour.enum} />).getByText(testDefaults.text)
        expect(cut.className).toContain(testColour.css)
      })
    }
  )

  describe('When a Tag is supplied with a custom className', () => {
    const customClass = 'my-custom-class'

    it('Should include the custom class in the element classes', () => {
      const cut = render(<Tag text={testDefaults.text} className={customClass} />).getByText(testDefaults.text)
      expect(cut.className).toContain(customClass)
    })

    it('Should include both the colour class and the custom class when colour is provided', () => {
      const cut = render(
        <Tag text={testDefaults.text} colour={TagColour.Green} className={customClass} />
      ).getByText(testDefaults.text)
      expect(cut.className).toContain('govuk-tag--green')
      expect(cut.className).toContain(customClass)
    })

    it('Should include both the default colour class and the custom class when colour is not provided', () => {
      const cut = render(
        <Tag text={testDefaults.text} className={customClass} />
      ).getByText(testDefaults.text)
      expect(cut.className).toContain('govuk-tag--blue')
      expect(cut.className).toContain(customClass)
    })
  })
})
