import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {SummaryPage} from '../SummaryPage';

const meta: Meta<typeof SummaryPage> = {
    title: 'HMRC GDS Pages/SummaryPage',
    component: SummaryPage
}

export default meta;

export const Default: StoryObj<typeof SummaryPage> = {
    args:{
        title:'MCI Screen',
        children:'MCI Screen description',
    }
}

export const WithTitle: StoryObj<typeof SummaryPage> = {
    args:{
        title:'Juvenile Screen',
        children:<>
            <p className='govuk-body'>Juvenile Screen description:</p>
            <p className='govuk-body'>you need to confirm your national insurance number</p>
        </>
    }
}

export const WithBannerTitle: StoryObj<typeof SummaryPage> = {
    args:{
        bannerTitle:'Banner Title',
        bannerClassName:'govuk-!-margin-bottom-6',
        children:<div>Children:renders react node content</div>,
    }
}