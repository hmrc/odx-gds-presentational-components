import React, { ChangeEventHandler, FormEvent, FormEventHandler, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RadioButtonGroup } from '../RadioButtonGroup';
import StoryPhaseBannerDecorator, { StoryPhaseBannerStyles } from '../../../../../.storybook/decorators/StoryPhaseBanner';
import { TextInput } from '../../..';

const meta: Meta<typeof RadioButtonGroup> = {
    title: 'GDS Components/RadioButtonGroup',
    component: RadioButtonGroup,
}

export default meta;

export const Default: StoryObj<typeof RadioButtonGroup> = {
    args: {
        label: 'When will you visit',
        options: [
            {
                label: 'This Week',
                value: 'thisWeek'
            },
            {
                label: 'Next Week',
                value: 'nextWeek'
            },
            {
                label: 'Never',
                value: 'never'
            }
        ],
        id: 'DefaultGroup',
        onChange: undefined
    }
}

export const ConditionalQuestions: StoryObj<typeof RadioButtonGroup> = {
    parameters: {
        StoryPhaseBannerDecorator: {
            style: StoryPhaseBannerStyles.Guideline,
            message: 'Per GDS Guidelines, you should only pass a single input as conditional content for a checkbox'
        }
    },
    decorators: [ StoryPhaseBannerDecorator ],
    args: {
        label: 'How would you like to be contacted?',
        id: 'contactInfo',
        options: [
            {
                label: 'Text',
                value: 'text',
                conditionalContent: <TextInput label='Mobile number' labelIsHeading={false} name='mobileno' id='mobileno' />
            },
            {
                label: 'Email',
                value: 'email',
                conditionalContent: <TextInput label='Email address' labelIsHeading={false} name='email' id='email' />
            }
        ],
        onChange: undefined
    }
}

export const HintText: StoryObj<typeof RadioButtonGroup> = {
    args: {
        label: 'How do you want to sign in?',
        id: 'signInMethod',
        hintText: 'You’ll need an account to prove your identity and complete your Self Assessment',
        options: [
            {
                label: 'Sign in with Government Gateway',
                value: 'gg',
                hintText: 'You’ll have a user ID if you’ve registered for Self Assessment or filed a tax return online before'
            },
            {
                label: 'Sign in with GOV.UK One Login',
                value: 'oneLogin',
                hintText: 'If you don’t have a GOV.UK One Login, you can create one'
            }
        ],
        onChange: undefined
    }
}

export const ErrorMessage: StoryObj<typeof RadioButtonGroup> = {
    args: {
        label: 'How would you like to be contacted?',
        id: 'contactInfo',
        errorText: 'Select your preferred contact method',
        options: [
            {
                label: 'Text',
                value: 'text'
            },
            {
                label: 'Email',
                value: 'email'
            }
        ],
        onChange: undefined
    }
}

export const SmallRadios: StoryObj<typeof RadioButtonGroup> = {
    args: {
        label: 'Continue?',
        id: 'continue',
        small: true,
        options: [
            {
                label: 'Yes',
                value: 'yes'
            },
            {
                label: 'No',
                value: 'no'
            }
        ],
        onChange: undefined
    }
}

export const InlineRadios: StoryObj<typeof RadioButtonGroup> = {
    args: {
        label: 'Continue?',
        id: 'continue',
        inline: true,
        options: [
            {
                label: 'Yes',
                value: 'yes'
            },
            {
                label: 'No',
                value: 'no'
            }
        ],
        onChange: undefined
    }
}

export const DividerExample: StoryObj<typeof RadioButtonGroup> = {
    args: {
        label: 'Where are you registered?',
        id: 'whereRegistered',
        options: [
            {
                label: 'England',
                value: 'eng'
            },
            {
                label: 'Wales',
                value: 'wal'
            },
            {
                label: 'Scotland',
                value: 'sco'
            },
            {
                label: 'Ireland',
                value: 'ire'
            },
            {
                divider: 'or'
            },
            {
                label: 'Not in UK',
                value: 'notUK'
            }
        ],
        onChange: undefined
    }
}

export const SubmitCheck: StoryObj<typeof RadioButtonGroup> = {
    args: {
        label: 'Where are you registered?',
        id: 'whereRegistered',
        options: [
            {
                label: 'England',
                value: 'eng',
            },
            {
                label: 'Wales',
                value: 'wal'
            },
            {
                label: 'Scotland',
                value: 'sco'
            },
            {
                label: 'Ireland',
                value: 'ire'
            },
            {
                divider: 'or'
            },
            {
                label: 'Not in UK',
                value: 'notUK'
            },
        ],
        onChange: undefined
    },
    render: (args) => {

        function handlesubmit(event: FormEvent): void {
            console.log(event)
        }
        return (
          <>
            <form onSubmit={handlesubmit}>
              <RadioButtonGroup {...args} />
              <button type='submit'>Submit</button>
            </form>
          </>
        )

    }
}


export const ChangeHandlerExample: StoryObj<typeof RadioButtonGroup> = {
    args: {
        label: 'Custom change handler example?',
        id: 'changeExample',
        options: [
            {
                label: 'Sign in with Government Gateway',
                value: 'gg',
                hintText: 'You’ll have a user ID if you’ve registered for Self Assessment or filed a tax return online before'
            },
            {
                label: 'Sign in with GOV.UK One Login',
                value: 'oneLogin',
                hintText: 'If you don’t have a GOV.UK One Login, you can create one'
            }
        ]
    },
    render: (args) => {
        const [exampleState, setExampleState] = useState({lastClicked: '', totalChanges: 0})

        const handleChange = (event: any) => {
            setExampleState({lastClicked: event.target.value, totalChanges: exampleState.totalChanges + 1})
        }

        return <>
            <RadioButtonGroup {...args} onChange={handleChange} value={exampleState.lastClicked} />
            <div className='govuk-body'>Last selected item had value '{exampleState.lastClicked}' and radio buttons have been changed {exampleState.totalChanges} times</div>
        </>
    }
}