import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './header.presenter';

type Story = StoryObj<typeof Header>;

const meta = {
  component: Header,
  argTypes: {},
} satisfies Meta<typeof Header>;

export default meta;

export const Default: Story = {};

export const HiddenNavigation: Story = {
  ...Default,
  args: {
    ...Default.args,
    variant: {
      'hidden-navigation': true,
    },
  },
};
