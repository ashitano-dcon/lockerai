import type { Meta, StoryObj } from '@storybook/react';
import { LinkEmojiIcon } from './link-emoji-icon.presenter';

type Story = StoryObj<typeof LinkEmojiIcon>;

const meta = {
  component: LinkEmojiIcon,
  argTypes: {},
} satisfies Meta<typeof LinkEmojiIcon>;

export default meta;

export const Default: Story = {};
