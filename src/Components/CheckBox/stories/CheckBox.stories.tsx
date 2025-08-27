import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CheckBox } from '../CheckBox';
import { TextInput } from '../../..';
import StoryPhaseBannerDecorator, { StoryPhaseBannerStyles } from '../../../../.storybook/decorators/StoryPhaseBanner';

const meta: Meta<typeof CheckBox> = {
    title: 'Infrastructure/CheckBox',
    component: CheckBox,
    parameters: {
        controls: {
            exclude: ['behaviour']
        }
    }
}

export default meta;

export const Default: StoryObj<typeof CheckBox> = {
    args: {
        label: 'Agree to the Terms and Conditions',
        value: 'yes',
        name: 'checkboxes',
        id: 'checkboxes'
    }
}

export const WithHintText: StoryObj<typeof CheckBox> = {
    args: {
        label: 'Sign in with GOV.UK One Login',
        value: 'yes',
        name: 'checkboxes',
        id: 'checkboxes',
        hintText: 'If you don’t have a GOV.UK One Login, you can create one'
    }
}

export const WithConditionalContent: StoryObj<typeof CheckBox> = {
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
        name: 'checkboxes',
        id: 'checkboxes',
        conditionalContent: <TextInput label='What is your email address' id='email' name='email' labelIsHeading={false} />,
        defaultChecked: true
    },
    render: (args) => {
        const [checkedStatus, setCheckedStatus] = useState(false);
        const handleChange = () => {
            setCheckedStatus(!checkedStatus)
        }
        return (
            <CheckBox {...args} onChange={handleChange} defaultChecked={checkedStatus} />
        )
    }
}