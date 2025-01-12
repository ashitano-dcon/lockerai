import type { Meta, StoryObj } from '@storybook/react';
import { PartyPopperEmojiIcon } from './party-popper-emoji-icon.presenter';

type Story = StoryObj<typeof PartyPopperEmojiIcon>;

const meta = {
  component: PartyPopperEmojiIcon,
  argTypes: {},
} satisfies Meta<typeof PartyPopperEmojiIcon>;

export default meta;

export const Default: Story = {};
