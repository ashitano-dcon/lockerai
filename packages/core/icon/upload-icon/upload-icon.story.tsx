import type { Meta, StoryObj } from '@storybook/react';
import { UploadIcon } from './upload-icon.presenter';

type Story = StoryObj<typeof UploadIcon>;

const meta = {
  component: UploadIcon,
  argTypes: {},
} satisfies Meta<typeof UploadIcon>;

export default meta;

export const Default: Story = {};
