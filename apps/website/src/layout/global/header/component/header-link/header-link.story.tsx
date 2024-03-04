import type { Meta, StoryObj } from '@storybook/react';
import { HeaderLink } from './header-link';

type Story = StoryObj<typeof HeaderLink>;

const meta = {
  component: HeaderLink,
  args: {
    href: '/dashboard',
    children: 'Overview',
  },
} satisfies Meta<typeof HeaderLink>;

export default meta;

export const Default: Story = {};

export const Selected: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/dashboard',
      },
    },
  },
};
