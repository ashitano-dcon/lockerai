import type { Meta, StoryObj } from '@storybook/react';
import { SignInDialog } from './sign-in-dialog.presenter';

type Story = StoryObj<typeof SignInDialog>;

const meta = {
  component: SignInDialog,
  argTypes: {
    signIn: {
      description: 'The sign in function.',
      control: {
        type: 'function',
      },
    },
  },
} satisfies Meta<typeof SignInDialog>;

export default meta;

export const Default: Story = {
  args: {
    defaultOpen: true,
    signIn: async () => {},
  },
};
