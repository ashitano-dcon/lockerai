import type { Meta, StoryObj } from '@storybook/react';
import { MemoEmojiIcon } from './memo-emoji-icon.presenter';

type Story = StoryObj<typeof MemoEmojiIcon>;

const meta = {
  component: MemoEmojiIcon,
  argTypes: {},
} satisfies Meta<typeof MemoEmojiIcon>;

export default meta;

export const Default: Story = {};
