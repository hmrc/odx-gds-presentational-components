import { MouseEventHandler } from 'react'

// xport type WelshLanguageToggleProps = welshLanguageToggleHrefIsRequired | welshLanguageToggleOnClickIsRequired | welshLanguageToggleHrefAndOnClickRequired

export interface WelshLanguageToggleProps {
  /**
   * The currently selected language
   */
  currentLanguage: 'english' | 'welsh'
  /**
   * config for Change to English link - either href and/or onClick handler
   * e.g. { href: '?en' } or { handleOnClick: () => { languageChangeFunctionality() } }
   */
  en: LanguageToggleOption
  /**
   * config for Change to Welsh link - either href and/or onClick handler
   * e.g. { href: '?cy' } or { handleOnClick: () => { languageChangeFunctionality() } }
   */
  cy: LanguageToggleOption
}

export type LanguageToggleOption = onlyHrefRequiredToggleOption | onlyOnClickRequiredToggleOption | hrefAndOnClickRequiredToggleOption

interface onlyHrefRequiredToggleOption {
  /**
   * href that should be navigated to display specific Language Content
   * (use onClick instead if programatically changing Content)
   */
  href: string
  /**
   * onClick handler called on click of Change Language to Welsh link
   * (use href instead if using default anchor navigation to translated content)
   */
  handleOnClick?: MouseEventHandler<HTMLAnchorElement>
}

interface onlyOnClickRequiredToggleOption {
  href?: string
  handleOnClick: MouseEventHandler<HTMLAnchorElement>
}

interface hrefAndOnClickRequiredToggleOption {
  href: string
  handleOnClick: MouseEventHandler<HTMLAnchorElement>
}
