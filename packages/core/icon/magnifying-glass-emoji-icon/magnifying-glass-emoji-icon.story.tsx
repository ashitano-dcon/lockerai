import type { Meta, StoryObj } from '@storybook/react';
import { MagnifyingGlassEmojiIcon } from './magnifying-glass-emoji-icon.presenter';

type Story = StoryObj<typeof MagnifyingGlassEmojiIcon>;

const meta = {
  component: MagnifyingGlassEmojiIcon,
  argTypes: {},
} satisfies Meta<typeof MagnifyingGlassEmojiIcon>;

export default meta;

export const Default: Story = {};
