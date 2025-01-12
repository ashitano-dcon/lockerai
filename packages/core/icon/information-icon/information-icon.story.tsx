import type { Meta, StoryObj } from '@storybook/react';
import { InformationIcon } from './information-icon.presenter';

type Story = StoryObj<typeof InformationIcon>;

const meta = {
  component: InformationIcon,
  argTypes: {},
} satisfies Meta<typeof InformationIcon>;

export default meta;

export const Default: Story = {};
