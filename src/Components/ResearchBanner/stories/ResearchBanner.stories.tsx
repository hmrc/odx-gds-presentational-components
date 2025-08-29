import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ResearchBanner } from '../ResearchBanner'

const meta: Meta<typeof ResearchBanner> = {
    title: 'HMRC Design System Components/Research Banner',
    component: ResearchBanner,
}

export default meta;

export const Default: StoryObj<typeof ResearchBanner> = {
    args: {
        header: 'Help make GOV.UK better',
        signupLink: 'https://www.gov.uk/research-signup',
        signupText: 'Sign up to take part in research (opens in new tab)',
        hideButton: true
    }
}

export const WithCloseButton: StoryObj<typeof ResearchBanner> = {
    args: {
        header: 'Help make GOV.UK better',
        signupLink: 'https://www.gov.uk/research-signup',
        signupText: 'Sign up to take part in research (opens in new tab)',
        hideButton: false,
        hideButtonText: 'Hide message',
        hideButtonAriaText: 'Hide message. I do not want to take part in research'
    }
}
