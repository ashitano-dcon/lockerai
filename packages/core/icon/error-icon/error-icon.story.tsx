import type { Meta, StoryObj } from '@storybook/react';
import { ErrorIcon } from './error-icon.presenter';

type Story = StoryObj<typeof ErrorIcon>;

const meta = {
  component: ErrorIcon,
  argTypes: {},
} satisfies Meta<typeof ErrorIcon>;

export default meta;

export const Default: Story = {};
