import type { Meta, StoryObj } from '@storybook/react';
import { UserAvatarPlaceholderIcon } from './user-avatar-placeholder-icon.presenter';

type Story = StoryObj<typeof UserAvatarPlaceholderIcon>;

const meta = {
  component: UserAvatarPlaceholderIcon,
  argTypes: {},
} satisfies Meta<typeof UserAvatarPlaceholderIcon>;

export default meta;

export const Default: Story = {};
