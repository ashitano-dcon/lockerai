import type { Meta, StoryObj } from '@storybook/react';
import { HeroSection } from './hero-section.presenter';

type Story = StoryObj<typeof HeroSection>;

const meta = {
  component: HeroSection,
  argTypes: {
    asAuth: {
      description: 'Whether to display the page as a page for authentication.',
      control: {
        type: 'boolean',
      },
    },
    redirectPathname: {
      description: 'Pathname to redirect after authentication is complete.',
      control: {
        type: 'text',
      },
    },
  },
} satisfies Meta<typeof HeroSection>;

export default meta;

export const Default: Story = {
  args: {
    asAuth: false,
    redirectPathname: undefined,
  },
};

export const AsAuth: Story = {
  ...Default,
  args: {
    ...Default.args,
    asAuth: true,
    redirectPathname: '/',
  },
};
