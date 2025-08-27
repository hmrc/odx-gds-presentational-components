import React from 'react'
import { cleanup, render } from '@testing-library/react'
import { snapshotAndAxeTest } from '../../../testHelpers'
import Header from '../GOVUKHeader'
import '@testing-library/jest-dom'

/****************
 * SET UP
 ****************/
// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

/****************
 * SNAPHOTS
 ****************/
snapshotAndAxeTest(
  'Default Govuk header',
  <Header serviceHome='#' brandRefresh={false} />
)

/****************
 * ASSERTIONS
 ****************/

describe('Feature: Govuk header', () => {
  describe('When I am using the GOVUK header component', () => {
    const header = render(<Header serviceHome='#' />)

    it('Should render the header component', () => {
      expect(header).toBeTruthy()
    })

    it('Should Render header tag', () => {
      expect(header.container.getElementsByTagName('header')).toBeTruthy()
    })

    it('Should render anchor tag', () => {
      expect(header.container.getElementsByTagName('a')).toBeTruthy()
    })

    it('Should render svg tag', () => {
      const header = render(<Header serviceHome='#' />)
      expect(header.getByRole('img')).toBeTruthy()
    })

    it('Should render the standard SVG logo', () => {
      const header = render(<Header serviceHome='#' />)
      const svg = header.container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg?.getAttribute('viewBox')).toBe('0 0 148 30');
    })

    it('Should set href of anchor to be same as the serviceHome prop', () => {
      const serviceHomeValue = 'test'
      const header = render(<Header serviceHome={serviceHomeValue} />)
      const href = header.container.getElementsByTagName('a')[0].getAttribute('href')
      expect(href).toBe(serviceHomeValue)
    })
  })

  describe('When I am using the GOVUK header component with a serviceHome prop', () => {
    it('Should set href of anchor to be same as the serviceHome prop', () => {
      const serviceHomeValue = 'test'
      const header = render(<Header serviceHome={serviceHomeValue} />)
      const href = header.container.getElementsByTagName('a')[0].getAttribute('href')
      expect(href).toBe(serviceHomeValue)
    })
  })

  describe('When I am using the GOVUK header component with brandRefresh', () => {
    it('Should render the updated SVG logo', () => {
      const header = render(<Header serviceHome='#' brandRefresh={true} />)
      const svg = header.container.querySelector('svg')
      expect(svg).toBeInTheDocument()
      expect(svg?.getAttribute('viewBox')).toBe('0 0 324 60')
    })
  })
})
