import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import CookieBanner from '../CookieBanner';

const meta: Meta<typeof CookieBanner> = {
    title: 'GDS Components/CookieBanner',
    component: CookieBanner
}

export default meta;


export const Default: StoryObj<typeof CookieBanner> = {
    args: {
        serviceName: "this service",
        standardDescription:<> <p className="govuk-body">We use some essential cookies to make this service work.</p>
                               <p className="govuk-body">We’d also like to use analytics cookies so we can understand how you use the service and make improvements.</p>
                            </>,
        acceptedDescription:   <p className="govuk-body">You’ve accepted additional cookies. You can <a className="govuk-link" href="#">change your cookie settings</a> at any time.</p>,
        rejectedDescription:   <p className="govuk-body">You’ve rejected additional cookies. You can <a className="govuk-link" href="#">change your cookie settings</a> at any time.</p>,
        acceptedHandler: function(){},
        rejectedHandler: function(){},
        acceptButtonText: "Accept analytical cookies",
        rejectButtonText: "Reject analytical cookies",
        cookieLink: ""
    }   
}