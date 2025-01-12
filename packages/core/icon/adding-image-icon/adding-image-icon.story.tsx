import type { Meta, StoryObj } from '@storybook/react';
import { AddingImageIcon } from './adding-image-icon.presenter';

type Story = StoryObj<typeof AddingImageIcon>;

const meta = {
  component: AddingImageIcon,
  argTypes: {},
} satisfies Meta<typeof AddingImageIcon>;

export default meta;

export const Default: Story = {};
