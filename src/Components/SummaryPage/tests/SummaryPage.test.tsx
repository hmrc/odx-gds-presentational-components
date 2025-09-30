import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { SummaryPage } from '../SummaryPage'

describe('SummaryPage Component', () => {
  it('renders Page with default title and description when banner is not provided', () => {
    render(
      <SummaryPage
        bannerTitle=''
        title='MCI Screen'
      >
        <p>MCI Screen content</p>
      </SummaryPage>
    )

    const titleElement = screen.getByText('MCI Screen')
    expect(titleElement).toBeInTheDocument()
    expect(titleElement).toHaveClass('govuk-heading-l')
    expect(screen.getByText('MCI Screen content')).toBeInTheDocument()
  })

  it('renders banner when banner prop is provided', () => {
    render(
      <SummaryPage
        bannerTitle='Banner Title'
        bannerClassName='custom-banner'
      >
        <p>Banner Page description</p>
      </SummaryPage>
    )

    const bannerElement = screen.getByText('Banner Title')
    expect(bannerElement).toBeInTheDocument()
    expect(screen.getByText('Banner Page description')).toBeInTheDocument()
  })

  it('applies custom banner class name correctly', () => {
    render(
      <SummaryPage
        bannerTitle='Banner Title'
        bannerClassName='custom-class'
      > Banner class name
      </SummaryPage>
    )
    const bannerContainer = screen.getByText('Banner Title').parentElement
    expect(bannerContainer).toHaveClass('govuk-panel govuk-panel--confirmation custom-class}')
  })
})
