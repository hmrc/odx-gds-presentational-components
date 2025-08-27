import React, { FC } from 'react'
import { WelshLanguageToggleProps } from './WelshLanguageToggle.types'

const WelshLanguageToggle: FC<WelshLanguageToggleProps> = (props: WelshLanguageToggleProps) => {
  const { en, cy, currentLanguage } = props

  return (
    <nav className='hmrc-language-select' aria-label={currentLanguage === 'welsh' ? 'Switcher iaith' : 'Language switcher'}>
      <ul className='hmrc-language-select__list'>

        <li className='hmrc-language-select__list-item'>
          {
            currentLanguage === 'english'
              ? <span aria-current='true'>English</span>
              : (
                <a href={en.href ?? '#'} onClick={en.handleOnClick} hrefLang='en' lang='en' rel='alternate' className='govuk-link'>
                  <span className='govuk-visually-hidden'>Change the language to English</span>
                  <span aria-hidden='true'>English</span>
                </a>
                )
          }

        </li>

        <li className='hmrc-language-select__list-item'>
          {
            currentLanguage === 'welsh'
              ? <span aria-current='true'>Cymraeg</span>
              : (
                <a href={cy.href ?? '#'} onClick={cy.handleOnClick} hrefLang='cy' lang='cy' rel='alternate' className='govuk-link'>
                  <span className='govuk-visually-hidden'>Newid yr iaith ir Gymraeg</span>
                  <span aria-hidden='true'>Cymraeg</span>
                </a>
                )
          }
        </li>
      </ul>
    </nav>
  )
}

export { WelshLanguageToggle }
