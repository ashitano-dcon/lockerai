import type { Meta, StoryObj } from '@storybook/react';
import { LocaleSwitch } from './locale-switch.presenter';

type Story = StoryObj<typeof LocaleSwitch>;

const meta = {
  component: LocaleSwitch,
  argTypes: {},
} satisfies Meta<typeof LocaleSwitch>;

export default meta;

export const Default: Story = {};
