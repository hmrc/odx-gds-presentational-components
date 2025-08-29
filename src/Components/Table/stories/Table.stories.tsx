import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Table } from '../Table';

const meta: Meta<typeof Table> = {
    title: 'GDS Components/Table',
    component: Table,
}

export default meta;

export const Default: StoryObj<typeof Table> = {
    args: {
        caption: 'Dates and amounts',
        columns: [{headText: 'Date'}, {headText: 'Amount'}],
        rows: [
            [ {content: 'First 6 weeks'}, {content: '£109.80 per week'} ],
            [ {content: 'Next 33 weeks'}, {content: '£109.80 per week'} ],
            [ {content: 'Toal estimated pay'}, {content: '£4,282.20'} ],
        ]

    }
}

export const CaptionStyle: StoryObj<typeof Table> = {
    args: {
        caption: 'Months and rates',
        captionClasses: 'govuk-table__caption--xl',
        columns: [{headText: 'Month you apply'}, {headText: 'Rate for vehicles'}],
        rows: [
            [ {content: 'January'}, {content: '£95'} ],
            [ {content: 'February'}, {content: '£55'} ],
            [ {content: 'March'}, {content: '£125'} ],
        ]

    }
}

export const NumericFields: StoryObj<typeof Table> = {
    args: {
        caption: 'Months and amounts',
        captionClasses: 'govuk-table__caption--xl',
        columns: [{headText: 'Month you apply'}, {headText: 'Rate for bicycles', format: 'numeric'}, { headText: 'Rate for vehicles', format: 'numeric'}],
        rows: [
            [ {content: 'January'}, {content: '£85'}, {content: '£95'} ],
            [ {content: 'February'}, {content: '£75'}, {content: '£55'} ],
            [ {content: 'March'}, {content: '£165'}, {content: '£125'} ],
        ]

    }
}

export const ColumnsClassOverride: StoryObj<typeof Table> = {
    args: {
        caption: 'Months you apply',
        captionClasses: 'govuk-table__caption--m',
        columns: [
            { headText: 'Date', classes: 'govuk-!-width-one-half' },
            { headText: 'Rate for vehicles', classes: 'govuk-!-width-one-quarter' },
            { headText: 'Rate for bicycles', classes: 'govuk-!-width-one-quarter' },
        ],
        rows: [
            [ {content: 'First 6 weeks'}, {content: '£109.80 per week'}, {content: '£59.10 per week'} ],
            [ {content: 'Next 33 weeks'}, {content: '£159.80 per week'}, {content: '£89.10 per week'} ],
            [ {content: 'Total estimated pay'}, {content: '£4,282.20'}, {content: '£2,182.20'} ],
        ]

    }
}
