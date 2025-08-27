import type { Meta, StoryObj } from '@storybook/react'
import { WarningText } from '../WarningText'

const meta: Meta<typeof WarningText> = {
  title: 'GDS Components/WarningText',
  component: WarningText
}

export default meta

export const Default: StoryObj<typeof WarningText> = {
  args: {
    iconFallbackText  : 'Warning',
    text  : 'You can be fined up to £5,000 if you do not register.'

  }
}
