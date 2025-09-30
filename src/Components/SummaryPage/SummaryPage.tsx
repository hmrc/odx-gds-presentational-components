import React, { FC } from 'react'
import SummaryPageProps from './SummaryPage.types'

const SummaryPage: FC<SummaryPageProps> = (props: SummaryPageProps) => {
  const { bannerTitle, title, children, bannerClassName } = props

  const classNames = `govuk-panel govuk-panel--confirmation ${bannerClassName ?? ''}}`

  return (
    <div>
      {typeof bannerTitle === 'string' && bannerTitle.trim().length > 0
        ? (
          <div className={classNames}>
            <h1 className='govuk-panel__title'>{bannerTitle}</h1>
          </div>
          )
        : (
          <h1 className='govuk-heading-l'>{title}</h1>
          )}
      {children !== null && children !== undefined && children !== '' &&
        (
          <>
            {children}
          </>
        )}
    </div>
  )
}

export { SummaryPage }
