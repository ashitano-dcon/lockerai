import type { Meta, StoryObj } from '@storybook/react';
import { SubmitIcon } from './submit-icon.presenter';

type Story = StoryObj<typeof SubmitIcon>;

const meta = {
  component: SubmitIcon,
  argTypes: {},
} satisfies Meta<typeof SubmitIcon>;

export default meta;

export const Default: Story = {};
