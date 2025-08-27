import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RadioButton } from '../RadioButton';
import { TextInput } from '../../..';
import StoryPhaseBannerDecorator, { StoryPhaseBannerStyles } from '../../../../../.storybook/decorators/StoryPhaseBanner';

const meta: Meta<typeof RadioButton> = {
    title: 'Infrastructure/RadioButton',
    component: RadioButton,
}

export default meta;

export const Default: StoryObj<typeof RadioButton> = {
    args: {
        label: 'Yes',
        value: 'yes',
        name: 'radioset',
        id: 'radioset'
    }
}

export const WithHintText: StoryObj<typeof RadioButton> = {
    args: {
        label: 'Sign in with GOV.UK One Login',
        value: 'yes',
        name: 'radioset',
        id: 'radioset',
        hintText: 'If you don’t have a GOV.UK One Login, you can create one'
    }
}

export const WithConditionalContent: StoryObj<typeof RadioButton> = {
    parameters: {
        StoryPhaseBannerDecorator: {
            style: StoryPhaseBannerStyles.Guideline,
            message: 'Per GDS Guidelines, you should only pass a single input as conditional content for a checkbox'
        }
    },
    decorators: [ StoryPhaseBannerDecorator ],
    args: {
        label: 'Sign in with GOV.UK One Login',
        value: 'yes',
        name: 'radioset',
        id: 'radioset',
        conditionalContent: <TextInput label='Example' id='example' name='example' labelIsHeading={false} />,
        defaultChecked: true
    },
    render: (args) => {
        const [checkedStatus, setCheckedStatus] = useState(false);
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setCheckedStatus(!e.target.defaultChecked)
        }
        return (
            <RadioButton {...args} onChange={handleChange} defaultChecked={checkedStatus} />
        )
    }
}