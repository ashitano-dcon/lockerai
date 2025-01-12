import type { Meta, StoryObj } from '@storybook/react';
import { BrandLogo } from './brand-logo.presenter';

type Story = StoryObj<typeof BrandLogo>;

const meta = {
  component: BrandLogo,
  argTypes: {
    withAnimate: {
      description: 'Whether to animate the logo.',
      control: 'boolean',
    },
  },
} satisfies Meta<typeof BrandLogo>;

export default meta;

export const Default: Story = {
  render: ({ ...props }) => <BrandLogo {...props} className="h-14 w-auto" />,
};

export const WithAnimation: Story = {
  ...Default,
  render: ({ ...props }) => <BrandLogo {...props} withAnimate className="h-14 w-auto" />,
};
