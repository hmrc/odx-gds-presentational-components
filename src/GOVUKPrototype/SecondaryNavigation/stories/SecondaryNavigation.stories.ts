import { Meta, StoryObj } from "@storybook/react"
import { SecondaryNavigation } from "../SecondaryNavigation"
import { secondaryNavigationAttributes, secondaryNavigationItemsWithClasses, secondaryNavigationItemsDefault } from "../tests/SecondaryNavigationStub";

const meta: Meta<typeof SecondaryNavigation> = {
  title: 'GOVUKPrototype/Secondary Navigation',
  component: SecondaryNavigation
}

export default meta

export const Default: StoryObj<typeof SecondaryNavigation> = {
  args: {
    items: secondaryNavigationItemsDefault
  }
}

export const WithCustomProps: StoryObj<typeof SecondaryNavigation> = {
  args: {
    items: secondaryNavigationItemsWithClasses,
    labelledBy: "main-nav",
    visuallyHiddenTitle: "Secondary Navigation Menu",
    classes: "govuk-!-margin-bottom-5",
    attributes: secondaryNavigationAttributes
  }
}

