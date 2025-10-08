import React from 'react'
import '@testing-library/jest-dom'
import { cleanup, render } from '@testing-library/react'
import { snapshotAndAxeTest } from '../../../testHelpers'
import { PhaseBanner } from '../PhaseBanner'
import { BannerTypes } from '../PhaseBanner.types'

/****************
 * SET UP
 ****************/

afterEach(cleanup)

/****************
 * SNAPHOTS AND AXE
 ****************/

snapshotAndAxeTest(
  'Alpha PhaseBanner',
  <PhaseBanner type={BannerTypes.alpha}>Test content <a className='govuk-link' href='#'>test feedback content</a>.</PhaseBanner>
)
snapshotAndAxeTest(
  'Beta PhaseBanner',
  <PhaseBanner type={BannerTypes.beta}>Test content <a className='govuk-link' href='#'>test feedback content</a>.</PhaseBanner>
)
/****************
 * ASSERTIONS
 ****************/
describe('PhaseBanner is required', () => {
  it('renders without crashing', () => {
    render(<PhaseBanner type={BannerTypes.alpha}>Test content <a className='govuk-link' href='#'>test feedback content</a>.</PhaseBanner>)
  })
})

describe('Alpha PhaseBanner is required', () => {
  it("displays 'Alpha' tag when type is 'Alpha'", () => {
    render(<PhaseBanner type={BannerTypes.alpha}>Alpha phase <a className='govuk-link' href='#'>test feedback content</a>.</PhaseBanner>)

    const bannerType = document.querySelectorAll('.govuk-tag')[0].innerHTML

    expect(bannerType).toBe('Alpha')
  })
})

describe('Beta PhaseBanner is required', () => {
  it("displays 'Beta' tag when type is 'Beta'", () => {
    render(<PhaseBanner type={BannerTypes.beta}>Beta phase <a className='govuk-link' href='#'>test feedback content</a>.</PhaseBanner>)

    const bannerType = document.querySelectorAll('.govuk-tag')[0].innerHTML

    expect(bannerType).toBe('Beta')
  })
})

describe('PhaseBanner content is required', () => {
  it('renders children inside the phase banner text span', () => {
    render(<PhaseBanner type={BannerTypes.alpha}>Some phase banner text</PhaseBanner>)

    const bannerText = document.querySelectorAll('.govuk-phase-banner__text')[0].innerHTML

    expect(bannerText).toBe('Some phase banner text')
  })
})

describe('PhaseBanner class names are required in line with GDS standards', () => {
  it('applies correct class names', () => {
    render(<PhaseBanner type={BannerTypes.alpha}>Test <a className='govuk-link' href='#'>test feedback content</a>.</PhaseBanner>)

    const bannerClass = document.querySelector('.govuk-phase-banner')
    const contentClass = document.querySelector('.govuk-phase-banner__content')
    const tagClass = document.querySelector('.govuk-tag')
    const textClass = document.querySelector('.govuk-phase-banner__text')

    expect(bannerClass).toBeTruthy()
    expect(contentClass).toBeTruthy()
    expect(tagClass).toBeTruthy()
    expect(textClass).toBeTruthy()
  })
})
