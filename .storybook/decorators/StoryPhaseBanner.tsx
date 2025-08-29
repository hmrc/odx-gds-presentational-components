import React from "react"
import { Decorator } from "@storybook/react"

export enum StoryPhaseBannerStyles {
  NotAdvised,
  Guideline,
  Info
}

interface StoryPhaseBannerProps {
  message?: string,
  style: StoryPhaseBannerStyles,
  children?: any
}

// TODO - Implement or replace with Phase Banner component once created to avoid duplication
export const StoryPhaseBanner = (props: StoryPhaseBannerProps) => {
  const { message, style, children } = props

  let tagColorClass
  let tagString
  let icon
  switch (style) {
    case StoryPhaseBannerStyles.NotAdvised:
      tagColorClass = 'govuk-tag--red'
      tagString = 'Not Advised'
      icon = '❗'
      break;
    case StoryPhaseBannerStyles.Guideline:
      tagColorClass = 'govuk-tag--yellow'
      tagString = 'GDS Guidance'
      icon = '⚠️'
      break;
    case StoryPhaseBannerStyles.Info:
      tagColorClass = 'govuk-tag--blue'
      tagString = 'Information'
      icon = 'ℹ️'
      break;
    default:
      break;
  }

  return (
    <div className="govuk-phase-banner" style={{backgroundColor: 'white', position: 'relative', zIndex: 9999}}>
      <p className="govuk-phase-banner__content">
        <strong className={`govuk-tag govuk-phase-banner__content__tag ${tagColorClass}`}>
          {tagString}
        </strong>
        <span className="govuk-phase-banner__text">
          {icon} {children ?? message}
        </span>
      </p>
    </div>
  )
}

const StoryPhaseBannerDecorator: Decorator = (Story, context) => (
  <>
    <div style={{paddingBottom: '10px'}}>
      <StoryPhaseBanner message={context.parameters.StoryPhaseBannerDecorator.message} style={context.parameters.StoryPhaseBannerDecorator.style} />
    </div>
    <Story />
  </>
)



export default StoryPhaseBannerDecorator