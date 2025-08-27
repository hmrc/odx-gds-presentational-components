import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Link } from "../Link";

const meta: Meta<typeof Link> = {
  title: "GDS Components/Link",
  component: Link,
  args: {
    children: 'HTML Example',
    href: '#'
  },
  decorators: [
    (Story) => (
      <p className="govuk-body"><Story/></p>
    )
  ]
};

export default meta;

export const Default: StoryObj<typeof Link> = {
};

export const WithoutVisitedState: StoryObj<typeof Link> = {
  args:{
    children: 'link text (with no visited state)',
    showVisitedState: false
  }
};

export const InvertedColour: StoryObj<typeof Link> = {
  args:{
    invertColour: true,
    children: 'link text (on dark background)'
  },
  decorators: [
    (Story) => <div style={{backgroundColor: '#1d70b8', padding: '5px'}}><Story /></div>
  ]
};

export const WithoutUnderline: StoryObj<typeof Link> = {
  args:{
    noUnderline: true,
    children: 'link text (with no underline)'
  }
};

export const OpensInNewTab: StoryObj<typeof Link> = {
  args:{
    opensInNewTab: true,
    children: 'link text (opens in new tab)'
  }
};
