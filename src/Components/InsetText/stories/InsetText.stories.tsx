import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { InsetText } from '../InsetText'

const meta: Meta<typeof InsetText> = {
  title: 'GDS Components/InsetText',
  component: InsetText
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: <>It can take up to 8 weeks to register a lasting power of attorney if there are no mistakes in the application.</>,
  }
}