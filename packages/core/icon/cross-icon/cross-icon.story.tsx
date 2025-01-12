import type { Meta, StoryObj } from '@storybook/react';
import { CrossIcon } from './cross-icon.presenter';

type Story = StoryObj<typeof CrossIcon>;

const meta = {
  component: CrossIcon,
  argTypes: {},
} satisfies Meta<typeof CrossIcon>;

export default meta;

export const Default: Story = {};
