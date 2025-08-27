import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import StoryPhaseBannerDecorator, { StoryPhaseBannerStyles } from '../../../../.storybook/decorators/StoryPhaseBanner'
import { NotificationBadge } from '../NotificationBadge';

const meta: Meta<typeof NotificationBadge> = {
    title: 'HMRC Design System Components/Notification Badge',
    component: NotificationBadge,
}

export default meta;

export const Default: StoryObj<typeof NotificationBadge> = {
    parameters: {
        StoryPhaseBannerDecorator: {
            message: 'The Notification Badge should not be used in isolation, but instead added to the right hand side of whatever it refers to',
            style: StoryPhaseBannerStyles.Guideline
        }
    },
    decorators: [ StoryPhaseBannerDecorator ],
    args: {
        notificationCount: 32
    }
}

export const ZeroNotifications: StoryObj<typeof NotificationBadge> = {
    parameters: {
        StoryPhaseBannerDecorator: {
            message: `If the notificationCount is 0, the component will not render anything. In this example, there should be nothing displayed until notification
            count is updated to be greater than 0`,
            style: StoryPhaseBannerStyles.Info
        }
    },
    decorators: [ StoryPhaseBannerDecorator ],
    args: {
        notificationCount: 0
    }
}

export const MoreThan99Notifications: StoryObj<typeof NotificationBadge> = {
    parameters: {
        StoryPhaseBannerDecorator: {
            message: `If the notificationCount is greater than 99, the component will display +99.`,
            style: StoryPhaseBannerStyles.Info
        }
    },
    decorators: [ StoryPhaseBannerDecorator ],
    args: {
        notificationCount: 200
    }
}