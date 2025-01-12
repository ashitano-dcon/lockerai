import type { Meta, StoryObj } from '@storybook/react';
import { SearchIcon } from './search-icon.presenter';

type Story = StoryObj<typeof SearchIcon>;

const meta = {
  component: SearchIcon,
  argTypes: {},
} satisfies Meta<typeof SearchIcon>;

export default meta;

export const Default: Story = {};
