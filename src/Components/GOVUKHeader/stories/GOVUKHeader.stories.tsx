import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Header from '../GOVUKHeader';

const meta: Meta<typeof Header> = {
    title: 'GDS Components/Header',
    component: Header,
}

export default meta;


export const Default: StoryObj<typeof Header> = {
    args: {
         serviceHome: "#",
    }   
}

