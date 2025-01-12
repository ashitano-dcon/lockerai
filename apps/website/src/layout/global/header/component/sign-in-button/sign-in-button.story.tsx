import type { Meta, StoryObj } from '@storybook/react';
import { SignInButton } from './sign-in-button.presenter';

type Story = StoryObj<typeof SignInButton>;

const meta = {
  component: SignInButton,
  argTypes: {
    loading: {
      description: 'Whether the button is loading.',
      control: {
        type: 'boolean',
      },
    },
  },
} satisfies Meta<typeof SignInButton>;

export default meta;

export const Default: Story = {};

export const Loading: Story = {
  ...Default,
  args: {
    ...Default.args,
    loading: true,
  },
};
