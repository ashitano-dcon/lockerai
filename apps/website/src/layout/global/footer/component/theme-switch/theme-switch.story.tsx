import type { Meta, StoryObj } from '@storybook/react';
import { ThemeSwitch } from './theme-switch.presenter';

type Story = StoryObj<typeof ThemeSwitch>;

const meta = {
  component: ThemeSwitch,
  argTypes: {},
} satisfies Meta<typeof ThemeSwitch>;

export default meta;

export const Default: Story = {};
