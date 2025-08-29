import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { WelshLanguageToggle } from '../WelshLanguageToggle';
import StoryPhaseBannerDecorator, { StoryPhaseBannerStyles } from '../../../../.storybook/decorators/StoryPhaseBanner'
import { fn } from '@storybook/test'

const meta: Meta<typeof WelshLanguageToggle> = {
    title: 'HMRC Design System Components/Welsh Language Toggle',
    component: WelshLanguageToggle,
}

export default meta;


export const WithHrefTargets: StoryObj<typeof WelshLanguageToggle> = {
    parameters: {
        StoryPhaseBannerDecorator: {
            style: StoryPhaseBannerStyles.Info,
            message: `Where English/Welsh content is provided at different urls, or requires different query strings, pass the relevant
            href for each language`
        }
    },
    decorators: [ StoryPhaseBannerDecorator ],
    args:{
        currentLanguage: 'english',
        cy:{ href: `/?path=/story/${meta.title.replace(/\/| /g, '-').toLowerCase()}--with-href-targets&args=currentLanguage:welsh`},
        en:{ href: `/?path=/story/${meta.title.replace(/\/| /g, '-').toLowerCase()}--with-href-targets&args=currentLanguage:english`}
    }
}

export const WithClickHandlers: StoryObj<typeof WelshLanguageToggle> = {
    parameters: {
        StoryPhaseBannerDecorator: {
            style: StoryPhaseBannerStyles.Info,
            message: `Where English/Welsh content is managed programatically, you may want to use clickHandlers instead of hrefs to manage the toggling of language.
            You can provide different handlers for each language selection . Be aware that as the toggle is implemented as anchor tags, you may need to prevent default
            behaviour in your onClick handlers.`
        },
        controls: {
            exclude: ['currentLanguage']
        }
    },
    decorators: [ StoryPhaseBannerDecorator ],
    args:{
        currentLanguage: 'english',
        cy:{ handleOnClick: fn() },
        en:{ handleOnClick: fn() }
    },
    render: (args) => {
        const [currentLang, setCurrentLang] = useState<'english'|'welsh'>('english')

        const languageClickHandler = fn((event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, lang: 'english'|'welsh') => {
            event.preventDefault()
            console.log(`${lang} language selected`)
            setCurrentLang(lang)
        })

        return (
            <WelshLanguageToggle
                currentLanguage={currentLang}
                cy={{ handleOnClick: (event) => languageClickHandler(event, 'welsh')}}
                en={{ handleOnClick: (event) => languageClickHandler(event, 'english')}}
            />
        )
    }
}

export const WelshSelected: StoryObj<typeof WelshLanguageToggle> = {
    args:{
        currentLanguage: 'welsh',
        cy: { href: `/?path=/story/${meta.title.replace(/\/| /g, '-').toLowerCase()}--welsh-selected&args=currentLanguage:welsh` },
        en: { href: `/?path=/story/${meta.title.replace(/\/| /g, '-').toLowerCase()}--welsh-selected&args=currentLanguage:english` }
    }
}