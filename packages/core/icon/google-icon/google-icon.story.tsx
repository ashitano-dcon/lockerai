import type { Meta, StoryObj } from '@storybook/react';
import { GoogleIcon } from './google-icon.presenter';

type Story = StoryObj<typeof GoogleIcon>;

const meta = {
  component: GoogleIcon,
  argTypes: {},
} satisfies Meta<typeof GoogleIcon>;

export default meta;

export const Default: Story = {};
