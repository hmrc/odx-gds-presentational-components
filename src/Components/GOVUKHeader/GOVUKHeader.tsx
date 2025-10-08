import React, { FC } from 'react'
import HeaderProps from './GOVUKHeader.types'
import HeaderUpdatedLogo from '../Icons/HeaderUpdatedLogo'
import HeaderStandardLogo from '../Icons/HeaderStandardLogo'

const GOVUKHeader: FC<HeaderProps> = (props: HeaderProps) => {
  const { serviceHome, brandRefresh = false } = props

  return (
    <header className='govuk-header'>
      <div className='govuk-header__container govuk-width-container'>
        <div className='govuk-header__logo'>
          <a href={serviceHome} className='govuk-header__link govuk-header__link--homepage'>
            {brandRefresh
              ? (
                <HeaderUpdatedLogo />
                )
              : (
                <HeaderStandardLogo />
                )}
          </a>
        </div>
      </div>
    </header>
  )
}

export default GOVUKHeader
