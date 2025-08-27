import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {SummaryListRow} from '../SummaryListRow';

const meta: Meta<typeof SummaryListRow> = {
    title: 'GDS Components/SummaryList/SummaryListRow',
    component: SummaryListRow,
    decorators: (Story) => {
        return (<dl className='govuk-summary-list'><Story /></dl>)
    }
}

export default meta;

export const Default: StoryObj<typeof SummaryListRow> = {
    args:{
        label:'Your Name',
        value:'Abbey Seedy'
    }
}

export const WithOneAction: StoryObj<typeof SummaryListRow> = {
    args:{
        label:'Your Name',
        value:'Abbey Seedy',
        actions:[{content:<>Change <span className="govuk-visually-hidden"> name</span></>, handleClick:()=>{}}]
    }
}

export const WithMultipleAction: StoryObj<typeof SummaryListRow> = {
    args:{
        label:'Contact Details',
        value:<>
            <p className='govuk-body'>07712345678</p>
            <p className='govuk-body'>abbyseedy@example.com</p>
        </>,
        actions:[{content:<>Add <span className="govuk-visually-hidden"> contact details</span></>, handleClick:()=>{}}, {content:<>Change <span className="govuk-visually-hidden"> contact details</span></>, handleClick:()=>{}}]
    }
}