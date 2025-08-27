import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../Button";
import { ButtonVariant }from "../ButtonVariant";
import StoryPhaseBannerDecorator, { StoryPhaseBannerStyles } from "../../../../.storybook/decorators/StoryPhaseBanner";

const meta: Meta<typeof Button> = {
  title: "GDS Components/Button",
  component: Button,
  args: {
    text: "Save and continue default",
  },
  parameters: {
    controls: {
      exclude: ['onClick']
    },
  },
  argTypes: {
    onClick: { action: "clicked" },
    variant: {
      options: ["Default", "Secondary", "Warning", "Inverse"],
      mapping: {
        Default: ButtonVariant.Default,
        Secondary: ButtonVariant.Secondary,
        Warning: ButtonVariant.Warning,
        Inverse: ButtonVariant.Inverse
      },
      control: {
        type: "select",
        labels: ["Default", "Secondary", "Warning", "Inverse"],
      },
    },
    disabled: {
      control: {
        type: "boolean"
      }
    }
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  /*args: {
    onClick: () => {}
  }*/
};

export const Text: Story = {
  args: {
    // text: "User text",
    onClick: () => {}
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    onClick: () => {}
  },
  parameters: {
    StoryPhaseBannerDecorator: {
      message: 'Due to poor contrast and potential confusion, it is best to avoid using disabled buttons where possible',
      style: StoryPhaseBannerStyles.NotAdvised
    },
    controls: {
      include: ['disabled']
    }
  },
  decorators: [
    StoryPhaseBannerDecorator
  ],
  render: (args) => (
      <div className='govuk-width-container'>
        <div>
          <Button {...args} text='Save and continue' />
        </div>
        <div>
          <Button {...args} text='Find address' variant={ButtonVariant.Secondary} />
        </div>
        <div>
          <Button {...args} text='Delete account' variant={ButtonVariant.Warning} />
        </div>
      </div>
  )
}
