import type { Meta, StoryObj } from '@storybook/react';
import { mockUser } from '#website/common/model/user';
import { UserDropdownMenu } from './user-dropdown-menu.presenter';

type Story = StoryObj<typeof UserDropdownMenu>;

const meta = {
  component: UserDropdownMenu,
  argTypes: {
    user: {
      description: 'The user object.',
      control: {
        type: 'object',
      },
    },
  },
} satisfies Meta<typeof UserDropdownMenu>;

export default meta;

export const Default: Story = {
  args: {
    user: mockUser(),
  },
};
