import type { Meta, StoryObj } from '@storybook/react';
import { CheckIcon } from '#core/icon/check-icon';
import { Button } from './button.presenter';

type Story = StoryObj<typeof Button>;

const meta: Meta<typeof Button> = {
  component: Button,
  argTypes: {
    icon: {
      description: 'The icon of the button.',
      control: {
        type: 'object',
      },
    },
    variant: {
      description: 'The variant of the this component.',
      control: {
        type: 'object',
      },
    },
  },
};

export default meta;

export const Default: Story = {
  render: ({ ...props }) => (
    <Button
      {...props}
      variant={{
        border: true,
        color: 'green',
      }}
    >
      Button
    </Button>
  ),
};

export const WithIcon: Story = {
  ...Default,
  render: ({ ...props }) => (
    <Button
      {...props}
      icon={CheckIcon}
      variant={{
        border: true,
        color: 'green',
      }}
    >
      Button
    </Button>
  ),
};

export const Loading: Story = {
  ...Default,
  render: ({ ...props }) => (
    <Button
      {...props}
      variant={{
        border: true,
        color: 'sage',
        loading: true,
      }}
    >
      Button
    </Button>
  ),
};
