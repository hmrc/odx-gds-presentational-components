import type { Meta, StoryObj } from "@storybook/react";
import { Tag } from "../Tag";
import { TagColour } from "../TagColour";

const colourOptions = [
  "Default",
  "Grey",
  "Green",
  "Turquoise",
  "Blue",
  "LightBlue",
  "Purple",
  "Pink",
  "Red",
  "Orange",
  "Yellow"
]

const meta: Meta<typeof Tag> = {
  title: "GDS Components/Tag",
  component: Tag,
  args: {
    text: "Completed",
  },
  argTypes: {
    colour: {
      options: colourOptions,
      mapping: {
        Default: TagColour.Default,
        Grey: TagColour.Grey,
        Green: TagColour.Green,
        Turquoise: TagColour.Turquoise,
        Blue: TagColour.Blue,
        LightBlue: TagColour.LightBlue,
        Purple: TagColour.Purple,
        Pink: TagColour.Pink,
        Red: TagColour.Red,
        Orange: TagColour.Orange,
        Yellow: TagColour.Yellow,
      },
      control: {
        type: "select",
        labels: colourOptions,
      },
    },
  },

};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = {};
