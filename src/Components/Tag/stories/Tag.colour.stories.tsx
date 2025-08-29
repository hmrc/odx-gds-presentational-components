import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Tag } from "../Tag";
import { TagColour } from "../TagColour";

const meta: Meta<typeof Tag> = {
  title: "GDS Components/Tag/Colour",
  component: Tag,
  parameters: {
    controls: {
      disable: true
    }
  }
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Grey: Story = {
  args: {
    text: "  Grey",
    colour: TagColour.Grey,
  }
}
export const Green: Story = {
  args: {
    text: "  Green",
    colour: TagColour.Green,
  }
}
export const Turquoise: Story = {
  args: {
    text: "  Turquoise",
    colour: TagColour.Turquoise,
  }
}
export const Blue: Story = {
  args: {
    text: "Blue",
    colour: TagColour.Blue,
  }
}
export const LightBlue: Story = {
  args: {
    text: "LightBlue",
    colour: TagColour.LightBlue,
  }
}
export const Purple: Story = {
  args: {
    text: "Purple",
    colour: TagColour.Purple,
  }
}
export const Pink: Story = {
  args: {
    text: "Pink",
    colour: TagColour.Pink,
  }
}
export const Red: Story = {
  args: {
    text: "Red",
    colour: TagColour.Red,
  }
}
export const Orange: Story = {
  args: {
    text: "Orange",
    colour: TagColour.Orange,
  }
}
export const Yellow: Story = {
  args: {
    text: "Yellow",
    colour: TagColour.Yellow,
  }
}