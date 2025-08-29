import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../Button";
import { ButtonVariant } from "../ButtonVariant";

const meta: Meta<typeof Button> = {
  title: "GDS Components/Button/Variants",
  component: Button,
  parameters: {
    controls: {
      disable: true
    }
  }
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    text: "Save and continue",
    onClick: () => {}
  }
}

export const Secondary: Story = {
  args: {
    text: "Find address",
    variant: ButtonVariant.Secondary,
    onClick: () => {}
  }
}

export const Warning: Story = {
  args: {
    text: "Delete account",
    variant: ButtonVariant.Warning,
    onClick: () => {}
  }
}

export const DarkBackground: Story = {
  args: {
    text: "Create an account",
    variant: ButtonVariant.Inverse,
    onClick: () => {}
  },
  render: (args) => (
    <div className='govuk-width-container' style={{backgroundColor: '#1d70b8', padding: '10px'}}>
      <div>
        <Button {...args} />
      </div>
    </div>
  )
}
