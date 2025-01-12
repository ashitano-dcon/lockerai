import type { Meta, StoryObj } from '@storybook/react';
import { SignOutIcon } from './sign-out-icon.presenter';

type Story = StoryObj<typeof SignOutIcon>;

const meta = {
  component: SignOutIcon,
  argTypes: {},
} satisfies Meta<typeof SignOutIcon>;

export default meta;

export const Default: Story = {};
