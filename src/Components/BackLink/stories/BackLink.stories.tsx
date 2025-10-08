import React from "react";
import type { Meta, StoryObj } from '@storybook/react'
import { BackLink } from '../BackLink';

const meta: Meta<typeof BackLink> = {
  title: 'GDS Components/BackLink',
  component: BackLink,
  parameters: {
    docs: {
      description: {
        component: 'A back link component that supports both string URLs and URL objects.'
      }
    }
  },
  argTypes: {
    href: {
      description: 'The URL to navigate to. Defaults to "#" if not provided.',
      required: false,
      type: { name: 'string', required: false }
    },
    text: {
      description: 'The text to display for the back link',
      required: true
    },
    inverse: {
      description: 'Whether to display the link in inverse colors for dark backgrounds',
      required: false
    },
    handleBackLink: {
      description: 'Optional click handler for the back link',
      required: false
    }
  }
}

export default meta

export const Default: StoryObj<typeof BackLink> = {
  args: {
    text: 'Back',
    href: '#',
  }
}

export const Inverse: StoryObj<typeof BackLink> = {
  args: {
    text: 'Back',
    href: '#',
    inverse: true
  },
  decorators: [
    (Story) => <div style={{ backgroundColor: '#1d70b8', padding: '5px' }}><Story /></div>
  ]

};

export const WithURLObject: StoryObj<typeof BackLink> = {
  args: {
    text: 'Back',
    href: new URL('https://gov.uk'),
  }
}

export const WithClickHandler: StoryObj<typeof BackLink> = {
  args: {
    text: 'Back',
    href: '#',
    handleBackLink: (e) => {
      e.preventDefault()
      alert('Back link clicked!')
    }
  }
}

