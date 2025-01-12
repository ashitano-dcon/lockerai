import type { Meta, StoryObj } from '@storybook/react';
import { DashboardIcon } from './dashboard-icon.presenter';

type Story = StoryObj<typeof DashboardIcon>;

const meta = {
  component: DashboardIcon,
  argTypes: {},
} satisfies Meta<typeof DashboardIcon>;

export default meta;

export const Default: Story = {};
