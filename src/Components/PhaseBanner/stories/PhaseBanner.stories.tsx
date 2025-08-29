import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { PhaseBanner } from '../PhaseBanner'
import { BannerTypes } from '../PhaseBanner.types'

const meta: Meta<typeof PhaseBanner> = {
  title: 'GDS Components/PhaseBanner',
  component: PhaseBanner
}

export default meta
type Story = StoryObj<typeof meta>

export const Alpha: Story = {
  args: {
    children: <>This is a new service. Help us improve it and <a className="govuk-link" href="#">give your feedback by email</a>.</>,
    type: BannerTypes.alpha
  }
}

export const Beta: Story = {
  args: {
    children: <>This is a new service. Help us improve it and <a className="govuk-link" href="#">give your feedback by email</a>.</>,
    type: BannerTypes.beta
  }
}

export const Wrapped: Story = {
  args: {
    children: <>Some Content <a className="govuk-link" href="#">give your feedback by email</a>.</>,
    type: BannerTypes.alpha
  }, 
  
  
  render: (args) => (
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-one-third">
            <h1 className="govuk-heading-l">Wrapped Phase Banner</h1>
            <p className="govuk-body">This is an example of how the Phase Banner can be used within a different layout.</p>
          </div>
          <div className="govuk-grid-column-two-thirds">
            <PhaseBanner {...args} />
          </div>
        </div>
      </main>
    </div>
  ),

}

