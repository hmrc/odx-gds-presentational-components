import React, { ChangeEvent, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CheckBoxGroup } from '../CheckBoxGroup';
import StoryPhaseBannerDecorator, { StoryPhaseBannerStyles } from '../../../../.storybook/decorators/StoryPhaseBanner';
import { TextInput } from '../../..';

const meta: Meta<typeof CheckBoxGroup> = {
    title: 'GDS Components/CheckboxGroup',
    component: CheckBoxGroup,
}

export default meta;

export const Default: StoryObj<typeof CheckBoxGroup> = {
    args: {
        label: 'Which types of waste do you transport?',
        options: [
            {
                label: 'Waste from animal carcasses',
                value: 'carcasses'
            },
            {
                label: 'Waste from mines or quarries',
                value: 'mines'
            },
            {
                label: 'Farm or agricultural waste',
                value: 'farm'
            }
        ],
        id: 'waste',
        name: 'waste'
    },
    render: (args) => {
        const [value, setValue] = useState<Array<string>>([])

        const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
            if(event.target.checked) {
                setValue([...value, event.target.value])
            }else{
                setValue([...value.filter(v => v !== event.target.value)])
            }
        }

        return <>
            <CheckBoxGroup {...args} onChange={handleChange} value={value} />
        </>
    }
}

export const ConditionalQuestions: StoryObj<typeof CheckBoxGroup> = {
    parameters: {
        StoryPhaseBannerDecorator: {
            style: StoryPhaseBannerStyles.Guideline,
            message: 'Per GDS Guidelines, you should only pass a single input as conditional content for a checkbox'
        }
    },
    decorators: [ StoryPhaseBannerDecorator ],
    args: {
        label: 'How would you like to be contacted?',
        id: 'contact',
        options: [
            {
                label: 'Phone',
                value: 'phone',
                conditionalContent: <TextInput label='Mobile number' labelIsHeading={false} name='mobileno' id='mobileno' />
            },
            {
                label: 'Email',
                value: 'email',
                conditionalContent: <TextInput label='Email address' labelIsHeading={false} name='email' id='email' />
            }
        ]
    },
    render: (args) => {
        const [value, setValue] = useState<Array<string>>([])

        const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
            if(event.target.checked) {
                setValue([...value, event.target.value])
            }else{
                setValue([...value.filter(v => v !== event.target.value)])
            }
        }

        return <>
            <CheckBoxGroup {...args} onChange={handleChange} value={value} />
        </>
    }
}

export const HintText: StoryObj<typeof CheckBoxGroup> = {
    args: {
        label: 'What is your nationality?',
        id: 'nationality',
        hintText: 'If you have dual nationality, select all options that are relevant to you.',
        options: [
            {
                label: 'British',
                value: 'british',
                hintText: 'including English, Scottish, Welsh and Northern Irish'
            },
            {
                label: 'Citizen of another country',
                value: 'other',
            }
        ]
    },
    render: (args) => {
        const [value, setValue] = useState<Array<string>>([])

        const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
            if(event.target.checked) {
                setValue([...value, event.target.value])
            }else{
                setValue([...value.filter(v => v !== event.target.value)])
            }
        }

        return <>
            <CheckBoxGroup {...args} onChange={handleChange} value={value} />
        </>
    }
}

export const ErrorMessage: StoryObj<typeof CheckBoxGroup> = {
    args: {
        label: 'How would you like to be contacted?',
        id: 'contact',
        errorText: 'Select your preferred contact method',
        options: [
            {
                label: 'Phone',
                value: 'phone'
            },
            {
                label: 'Email',
                value: 'email'
            }
        ]
    },
    render: (args) => {
        const [value, setValue] = useState<Array<string>>([])

        const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
            if(event.target.checked) {
                setValue([...value, event.target.value])
            }else{
                setValue([...value.filter(v => v !== event.target.value)])
            }
        }

        return <>
            <CheckBoxGroup {...args} onChange={handleChange} value={value} />
        </>
    }
}

export const Smallercheckboxes: StoryObj<typeof CheckBoxGroup> = {
    args: {
        label: 'Organisation',
        name: 'organisation',
        small: true,
        options: [
            {
                label: 'HM Revenue and Customs (HMRC)',
                value: 'hmrc'
            },
            {
                label: 'Employment Tribunal',
                value: 'employment-tribunal'
            },
            {
                label: 'Ministry of Defence',
                value: 'MOD'
            }
        ]
    },
    render: (args) => {
        const [value, setValue] = useState<Array<string>>([])

        const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
            if(event.target.checked) {
                setValue([...value, event.target.value])
            }else{
                setValue([...value.filter(v => v !== event.target.value)])
            }
        }

        return <>
            <CheckBoxGroup {...args} onChange={handleChange} value={value} />
        </>
    }
}

export const DividerExample: StoryObj<typeof CheckBoxGroup> = {
    args: {
        label: 'Will you be travelling to any of these countries?',
        hintText: "Select all countries that apply",
        name: 'countries',
        id: 'country',
        options: [
            {
                label: 'France',
                value: 'france'
            },
            {
                label: 'Portugal',
                value: 'portugal'
            },
            {
                label: 'Spain',
                value: 'spain'
            },
            {
                divider: 'or'
            },
            {
                label: 'None',
                hintText: "No, I will not be travelling to any of these countries",
                value: 'none',
                behaviour: "exclusive"
            }
        ]
    },
    render: (args) => {
        const [value, setValue] = useState<Array<string>>([])

        const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
            const behaviour = event.target.getAttribute("data-behaviour")
            if(event.target.checked) {
              if(behaviour && behaviour === 'exclusive'){
                setValue([event.target.value])
              }else{
                setValue([...value.filter(v => v != 'none'), event.target.value])
              }
            }else{
              if(behaviour && behaviour === 'exclusive'){
                setValue([])
              }else {
                setValue([...value.filter(v => v !== event.target.value)])
              }
            }
        }

        return <>
            <CheckBoxGroup {...args} onChange={handleChange} value={value} />
        </>
    }
}

export const ChangeHandlerExample: StoryObj<typeof CheckBoxGroup> = {
    args: {
        label: 'Will you be travelling to any of these countries?',
        hintText: "Select all countries that apply",
        name: 'countries',
        id: 'country',
        options: [
            {
                label: 'France',
                value: 'france'
            },
            {
                label: 'Portugal',
                value: 'portugal'
            },
            {
                label: 'Spain',
                value: 'spain'
            },
            {
                divider: 'or'
            },
            {
                label: 'None',
                hintText: "No, I will not be travelling to any of these countries",
                value: 'none',
                behaviour: "exclusive"
            }
        ]
    },
    render: (args) => {
        const [exampleState, setExampleState] = useState({lastClicked: '', totalChanges: 0})
        const [ value, setValue ] = useState([])

        const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
            const behaviour = event.target.getAttribute("data-behaviour")
            setExampleState({lastClicked: event.target.value, totalChanges: exampleState.totalChanges + 1})
            if(event.target.checked) {
              if(behaviour && behaviour === 'exclusive'){
                setValue([event.target.value])
              }else{
                setValue([...value.filter(v => v != 'none'), event.target.value])
              }
            }else{
              if(behaviour && behaviour === 'exclusive'){
                setValue([])
              }else {
                setValue([...value.filter(v => v !== event.target.value)])
              }
            }
        }

        return <>
            <CheckBoxGroup {...args} onChange={handleChange} value={value} />
            <div className='govuk-body'>Last selected item had value '{exampleState.lastClicked}' and Checkbox have been changed {exampleState.totalChanges} times</div>
        </>
    }
}