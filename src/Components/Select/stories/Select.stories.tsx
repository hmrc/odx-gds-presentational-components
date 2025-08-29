import type { Meta, StoryObj } from '@storybook/react';
import { Select } from '../Select'

const meta: Meta<typeof Select> = {
    title: 'GDS Components/Select',
    component: Select,
}

export default meta;

const defaultArgs = {
    label: 'Sort By',
    name: 'selectitem',
    id: 'selectitem',
    selectOptions: [
        {value: 'dateUpdated', name: 'Date updated'},
        {value: 'datePublished', name: 'Date published'},
        {value: 'mostComments', name: 'Most comments'},
        {value: 'mostLikes', name: 'Most likes'}
    ]
}

export const Default: StoryObj<typeof Select> = {
    args: {
        ...defaultArgs
    }
}

export const WithLabelNotHeading: StoryObj<typeof Select> = {
    args: {
        ...defaultArgs,
        labelIsHeading: false
    }
}

export const WithPreselectedOption: StoryObj<typeof Select> = {
    args: {
        label: 'Sort By',
        name: 'selectitem',
        id: 'selectitem',
        selectOptions: [
            {value: 'dateUpdated', name: 'Date updated'},
            {value: 'datePublished', name: 'Date published'},
            {value: 'mostComments', name: 'Most comments', selected: true},
            {value: 'mostLikes', name: 'Most likes'}
        ]
    }
}

export const WithHintText: StoryObj<typeof Select> = {
    args: {
        ...defaultArgs,
        hintText: 'This can be different to where you went before'
    }
}

export const WithErrorText: StoryObj<typeof Select> = {
    args: {
        ...defaultArgs,
        hintText: 'This can be different to where you went before',
        errorText: 'Please select an option'
    }
}