import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { StartButton } from '../StartButton';

const meta: Meta<typeof StartButton> = {
    title: 'GDS Components/StartButton',
    component: StartButton,
}

export default meta;

export const Default: StoryObj<typeof StartButton> = {
  args: {
    href: '#'
  }
}

export const CustomText: StoryObj<typeof StartButton> = {
  args: {
    text: 'Begin a claim',
    href: '#'
  }
}