import React from 'react'
import { cleanup, fireEvent, render } from '@testing-library/react'
import { snapshotAndAxeTest } from '../../../testHelpers'
import { WelshLanguageToggle } from '../WelshLanguageToggle'
import '@testing-library/jest-dom'

/****************
 * SET UP
 ****************/
// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
afterEach(() => {
  cleanup()
  jest.resetAllMocks()
})

/****************
 * SNAPHOTS
 ****************/

snapshotAndAxeTest('Welsh Language Toggle with just hrefs configured, and English currently selected',
  <WelshLanguageToggle currentLanguage='english' cy={{ href: '?cy' }} en={{ href: '?en' }} />
)
snapshotAndAxeTest('Welsh Language Toggle with just hrefs configured, and Welsh currently selected',
  <WelshLanguageToggle currentLanguage='welsh' cy={{ href: '?cy' }} en={{ href: '?en' }} />
)
snapshotAndAxeTest('Welsh Language Toggle with just onClickHandlers configured, and English currently selected',
  <WelshLanguageToggle currentLanguage='english' cy={{ handleOnClick: () => {} }} en={{ handleOnClick: () => {} }} />
)
snapshotAndAxeTest('Welsh Language Toggle with just onClickHandlers configured, and Welsh currently selected',
  <WelshLanguageToggle currentLanguage='welsh' cy={{ handleOnClick: () => {} }} en={{ handleOnClick: () => {} }} />
)
snapshotAndAxeTest('Welsh Language Toggle with both href and onClickHandlers configured, and English currently selected',
  <WelshLanguageToggle currentLanguage='english' cy={{ handleOnClick: () => {} }} en={{ handleOnClick: () => {} }} />
)
snapshotAndAxeTest('Welsh Language Toggle with both href and onClickHandlers configured, and Welsh currently selected',
  <WelshLanguageToggle currentLanguage='welsh' cy={{ href: '?cy', handleOnClick: () => {} }} en={{ href: '?en', handleOnClick: () => {} }} />
)

/****************
 * ASSERTIONS
 ****************/
interface WelshLanguageToggleTestOptions {
  selectedLanguage: 'english' | 'welsh'
  otherLanguage: 'english' | 'welsh'
  otherLanguageCode: 'cy' | 'en'
  expectedLinkText: string
  testWelshHref: string
  testEnglishHref: string
  expectedLinkHref: string
}

describe('Given I am using the Welsh Language toggle component', () => {
  describe.each<WelshLanguageToggleTestOptions>([
    { selectedLanguage: 'english', otherLanguage: 'welsh', otherLanguageCode: 'cy', expectedLinkText: 'Cymraeg', testEnglishHref: '/english-content', testWelshHref: '/cymreag-content', expectedLinkHref: '/cymreag-content' },
    { selectedLanguage: 'welsh', otherLanguage: 'english', otherLanguageCode: 'en', expectedLinkText: 'English', testEnglishHref: '/english-content', testWelshHref: '/cymreag-content', expectedLinkHref: '/english-content' }
  ])('When $selectedLanguage is the currently selected language',
    ({ selectedLanguage, otherLanguage, otherLanguageCode, expectedLinkText, testEnglishHref, testWelshHref, expectedLinkHref }) => {
      it(`Should render a change to ${otherLanguage} link`, () => {
        const links = render(<WelshLanguageToggle currentLanguage={selectedLanguage} cy={{ href: '#' }} en={{ href: '#' }} />).getAllByRole('link')
        expect(links.length).toEqual(1)
        expect(links[0].textContent).toMatch(expectedLinkText)
      })

      describe(`When only a href to ${otherLanguage} content is provided`, () => {
        it(`Should render change to ${otherLanguage} link with given href`, () => {
          const changeToOtherLanguageLink = render(<WelshLanguageToggle currentLanguage={selectedLanguage} cy={{ href: testWelshHref }} en={{ href: testEnglishHref }} />).getByRole('link')
          expect(changeToOtherLanguageLink.attributes.getNamedItem('href')?.value).toBe(expectedLinkHref)
        })
      })

      const mockOnClick = jest.fn()
      describe(`When only an onClick handler is provided for the ${otherLanguage} toggle`, () => {
        const toggleTestProps = { cy: { handleOnClick: () => {} }, en: { handleOnClick: () => {} } }
        toggleTestProps[`${otherLanguageCode}`].handleOnClick = mockOnClick

        const LanguageToggle = <WelshLanguageToggle currentLanguage={selectedLanguage} {...toggleTestProps} />
        it(`Should render change to  ${otherLanguage} link with default href '#'`, () => {
          const changeToOtherLanguageLink = render(LanguageToggle).getByRole('link')
          expect(changeToOtherLanguageLink.attributes.getNamedItem('href').value).toBe('#')
        })
        it(`Should call provided click handler when Change to  ${otherLanguage} link is clicked`, () => {
          const changeToOtherLanguageLink = render(LanguageToggle).getByRole('link')
          fireEvent.click(changeToOtherLanguageLink)
          expect(mockOnClick).toHaveBeenCalledTimes(1)
        })
      })

      describe(`When a href and onClick handler is provided for the ${otherLanguage} toggle`, () => {
        const toggleTestProps = { cy: { href: testWelshHref, handleOnClick: () => {} }, en: { href: testEnglishHref, handleOnClick: () => {} } }
        toggleTestProps[`${otherLanguageCode}`].handleOnClick = mockOnClick

        const LanguageToggle = (
          <WelshLanguageToggle
            currentLanguage={selectedLanguage}
            {...toggleTestProps}
          />
        )
        it(`Should render change to ${otherLanguage} link with provided href`, () => {
          const changeToOtherLanguageLink = render(LanguageToggle).getByRole('link')
          expect(changeToOtherLanguageLink.attributes.getNamedItem('href').value).toBe(expectedLinkHref)
        })
        it(`Should call provided click handler when Change to ${otherLanguage}  link is clicked`, () => {
          const changeToOtherLanguageLink = render(LanguageToggle).getByRole('link')
          fireEvent.click(changeToOtherLanguageLink)
          expect(mockOnClick).toHaveBeenCalledTimes(1)
        })
      })
    })
})
