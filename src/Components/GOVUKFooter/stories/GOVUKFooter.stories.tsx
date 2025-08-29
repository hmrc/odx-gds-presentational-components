import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import GOVUKFooter from '../GOVUKFooter'

const meta: Meta<typeof GOVUKFooter> = {
    title: 'GDS Components/Footer',
    component: GOVUKFooter
}

export default meta

const defaultArgs = {
    licenceDeclaration: {
        textStart: 'All content is available under the ', linkText: 'Open Government Licence v3.0, ', linkHref: '/link', textEnd: 'except where otherwise stated'
    },
    copyrightLinkText: '© Crown copyright',
    opensInNewTabText : 'Opens link in new tab',
}

export const Default: StoryObj<typeof GOVUKFooter> = {
    args: {
        ...defaultArgs,
        brandRefresh: false
    }   
}

export const WithLinks: StoryObj<typeof GOVUKFooter> = {
    args: {
        ...defaultArgs,
        footerContent: [
            {
                links: [
                    { linkText: 'Link 1', linkHref: '/link1' },
                    { linkText: 'Link 2', linkHref: '/link2' },
                    { linkText: 'Link 3', linkHref: '/link3' }
                ]
            }
        ],
        brandRefresh: false
    }   
}

export const WithSecondaryNavigation: StoryObj<typeof GOVUKFooter> = {
    args: {
        ...defaultArgs,
        footerContent: [
            {
                header: 'Column One',
                columnClass: 'govuk-grid-column-two-thirds',
                listClass: 'govuk-footer__list--columns-2',
                links: [
                    { linkText: 'Link 1', linkHref: '/link1' },
                    { linkText: 'Link 2', linkHref: '/link2' },
                    { linkText: 'Link 3', linkHref: '/link3' },
                    { linkText: 'Link 4', linkHref: '/link4' },
                    { linkText: 'Link 5', linkHref: '/link5' },
                    { linkText: 'Link 6', linkHref: '/link6' }
                ]
            },
            {
                header: 'Column Two',
                columnClass: 'govuk-grid-column-one-third',
                links: [
                    { linkText: 'Link 7', linkHref: '/link7' },
                    { linkText: 'Link 8', linkHref: '/link8' },
                    { linkText: 'Link 9', linkHref: '/link9' }
                ]
            }
        ],
        brandRefresh: false
    }   
}

export const WithCrownDisplayed: StoryObj<typeof GOVUKFooter> = {
    args: {
        ...defaultArgs,
        footerContent: [
            {
                links: [
                    { linkText: 'Link 1', linkHref: '/link1' },
                    { linkText: 'Link 2', linkHref: '/link2' },
                    { linkText: 'Link 3', linkHref: '/link3' }
                ]
            }
        ],
        brandRefresh: true
    }   
}