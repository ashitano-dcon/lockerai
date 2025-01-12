import type { Meta, StoryObj } from '@storybook/react';
import { SelectContent } from './select-content.presenter';
import { SelectGroup } from './select-group.presenter';
import { SelectItem } from './select-item.presenter';
import { SelectLabel } from './select-label.presenter';
import { SelectTrigger } from './select-trigger.presenter';
import { SelectValue } from './select-value.presenter';
import { Select } from './select.presenter';

type Story = StoryObj<typeof Select>;

const meta: Meta<typeof Select> = {
  component: Select,
  argTypes: {},
};

export default meta;

export const Default: Story = {
  render: ({ ...props }) => (
    <Select {...props}>
      <SelectTrigger>
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};
