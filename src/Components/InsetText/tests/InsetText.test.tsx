import React from 'react'
import '@testing-library/jest-dom'
import { cleanup, render } from '@testing-library/react'
import { snapshotAndAxeTest } from '../../../testHelpers'
import { InsetText } from '../InsetText'

/****************
 * SET UP
 ****************/

afterEach(cleanup)

/****************
 * SNAPHOTS AND AXE
 ****************/

snapshotAndAxeTest(
  'Alpha InsetText',
  <InsetText>
    Test content{' '}
    <a className='govuk-link' href='#'>
      test feedback content
    </a>
    .
  </InsetText>
)
snapshotAndAxeTest(
  'Beta InsetText',
  <InsetText>
    It can take up to 8 weeks to register a lasting power of attorney if there
    are no mistakes in the application.
  </InsetText>
)
/****************
 * ASSERTIONS
 ****************/

describe('Given a InsetText Component', () => {
  describe('When InsetText is required', () => {
    it('Then it should render without crashing', () => {
      render(
        <InsetText>
          Test content{' '}
          <a className='govuk-link' href='#'>
            test feedback content
          </a>
          .
        </InsetText>
      )
    })
  })

  describe('When InsetText content is rendered', () => {
    it('Then it Should have children inside the inset text div', () => {
      render(<InsetText>Some inset text</InsetText>)

      const bannerText =
        document.querySelectorAll('.govuk-inset-text')[0].innerHTML

      expect(bannerText).toBe('Some inset text')
    })
  })

  describe('When InsetText class names are required in line with GDS standards', () => {
    it('Then it should apply correct class names', () => {
      render(
        <InsetText>
          Test{' '}
          <a className='govuk-link' href='#'>
            test feedback content
          </a>
          .
        </InsetText>
      )

      const textClass = document.querySelector('.govuk-inset-text')

      expect(textClass).toBeTruthy()
    })
  })
})
